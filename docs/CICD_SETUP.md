# CI/CD setup (GitHub Actions → Firebase)

Four workflows in `.github/workflows/`, modelled on the endgame project:

| Workflow | Trigger | Does |
| --- | --- | --- |
| `firebase-hosting-merge.yml` | push to `main` | build + deploy hosting to the **live** channel |
| `firebase-hosting-pull-request.yml` | PR to `main` | build + deploy to a **preview** channel, comments the URL on the PR |
| `functions.yml` | push to `main` touching `functions/**`, rules, indexes, or `firebase.json` | deploy functions + Firestore rules + indexes |
| `tests.yml` | push / PR to `main` | lint + build the web app and the functions |

## Required GitHub repository secrets

Add these under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT` | JSON key for a deploy service account (see below) |
| `FIREBASE_PROJECT_ID` | `ownit-afc0f` |
| `VITE_FIREBASE_API_KEY` | from the web app config |
| `VITE_FIREBASE_AUTH_DOMAIN` | `ownit-afc0f.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `ownit-afc0f` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `ownit-afc0f.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `804316033885` |
| `VITE_FIREBASE_APP_ID` | `1:804316033885:web:0994f6abd6dc71c9cbeeb4` |

(The `VITE_*` values are public web config, not secrets — they're kept as Actions
secrets only to mirror the endgame setup and keep the workflow tidy.)

## Deploy service account

Easiest: run once locally and let Firebase create the SA + add the
`FIREBASE_SERVICE_ACCOUNT` secret automatically:

```bash
firebase init hosting:github
```

Or create it manually with the roles a Gen 2 deploy needs:

```bash
SA=ownit-deployer
gcloud iam service-accounts create $SA --project ownit-afc0f --display-name "OwnIt CI deployer"
EMAIL=$SA@ownit-afc0f.iam.gserviceaccount.com
for role in roles/firebasehosting.admin roles/cloudfunctions.admin \
  roles/firebaserules.admin roles/datastore.indexAdmin \
  roles/run.admin roles/iam.serviceAccountUser roles/artifactregistry.admin \
  roles/serviceusage.serviceUsageConsumer; do
  gcloud projects add-iam-policy-binding ownit-afc0f --member="serviceAccount:$EMAIL" --role="$role"
done
gcloud iam service-accounts keys create key.json --iam-account "$EMAIL"
# paste key.json contents into the FIREBASE_SERVICE_ACCOUNT secret, then delete it
rm key.json
```

Note: functions runtime reads AWS creds from the shared `miggle-vault` project, so
the **runtime** service account (`804316033885-compute@developer.gserviceaccount.com`)
already has Secret Manager Accessor there. The deploy SA above does not need vault access.
