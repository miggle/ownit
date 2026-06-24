# CI/CD setup (GitHub Actions → Firebase)

Auth is **keyless** via Workload Identity Federation (WIF): GitHub Actions exchanges
its OIDC token for short-lived GCP credentials. There are **no service-account keys**
anywhere — nothing to leak, store, or rotate.

Four workflows in `.github/workflows/`:

| Workflow | Trigger | Does |
| --- | --- | --- |
| `firebase-hosting-merge.yml` | push to `main` | build + deploy hosting (live) |
| `firebase-hosting-pull-request.yml` | PR to `main` | deploy a preview channel, comment the URL |
| `functions.yml` | push to `main` touching `functions/**`, rules, indexes, or `firebase.json` | deploy functions + Firestore rules + indexes |
| `tests.yml` | push / PR to `main` | lint + build web and functions |

## Required GitHub secrets

Only the **public** Firebase web config (used at build time). No auth secret.

| Secret | Value |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | from the web app config |
| `VITE_FIREBASE_AUTH_DOMAIN` | `ownit-afc0f.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `ownit-afc0f` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `ownit-afc0f.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `804316033885` |
| `VITE_FIREBASE_APP_ID` | `1:804316033885:web:0994f6abd6dc71c9cbeeb4` |

The old `FIREBASE_SERVICE_ACCOUNT` / `FIREBASE_PROJECT_ID` secrets are no longer used and can be deleted.

## How the keyless auth is wired

Workflows authenticate with `google-github-actions/auth@v2` using a WIF provider
and a dedicated deploy service account (`ownit-deployer@ownit-afc0f.iam.gserviceaccount.com`),
both referenced inline in the YAML (neither value is secret). Each deploy job sets
`permissions: id-token: write`.

### The GCP setup behind it (already done; recorded for reproducibility)

```bash
PROJECT=ownit-afc0f; NUM=804316033885
SA=ownit-deployer@$PROJECT.iam.gserviceaccount.com
REPO=miggle/ownit

gcloud services enable iam.googleapis.com sts.googleapis.com iamcredentials.googleapis.com --project $PROJECT

# Pool + GitHub OIDC provider, restricted to the miggle org
gcloud iam workload-identity-pools create github-pool --project=$PROJECT --location=global --display-name="GitHub Actions"
gcloud iam workload-identity-pools providers create-oidc github-provider \
  --project=$PROJECT --location=global --workload-identity-pool=github-pool \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner == 'miggle'"

# Let only this repo impersonate the deploy SA
gcloud iam service-accounts add-iam-policy-binding $SA --project=$PROJECT \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/projects/${NUM}/locations/global/workloadIdentityPools/github-pool/attribute.repository/${REPO}"
```

### Deploy SA roles (`ownit-deployer`)

`roles/firebasehosting.admin`, `roles/cloudfunctions.admin`, `roles/run.admin`,
`roles/firebaserules.admin`, `roles/datastore.indexAdmin`,
`roles/serviceusage.serviceUsageConsumer`, and `roles/secretmanager.admin`
(only needed if functions bind local `defineSecret`s — `GITHUB_TOKEN` does).
Plus `roles/iam.serviceAccountUser` (`actAs`) on **both** the compute and the
`@appspot` service accounts — Gen 2 deploy runs as the compute SA, and
firebase-tools preflight-checks the appspot one.

Runtime functions still read AWS creds from the shared `miggle-vault` project; the
runtime compute SA already has Secret Manager Accessor there (separate from CI).
