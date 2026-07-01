# Moving the deploy workflows from hardcoded values to repo Variables

Right now the three deploy workflows in `.github/workflows/` have the Workload
Identity Federation (WIF) provider, deployer service account, and Firebase
project id **hardcoded**:

- `firebase-hosting-merge.yml`
- `firebase-hosting-pull-request.yml`
- `functions.yml`

This works fine. The only reason to switch to repo **Variables** is consistency
with `gamechangers`, which reads these three values from `vars.*` instead of
inlining them. It makes the ymls identical across projects (only the values in
the GitHub UI differ per repo).

This is optional. If you don't need cross-repo consistency, leave the ymls as-is.

## 1. Add three GitHub repository Variables

Settings → Secrets and variables → Actions → **Variables** tab (not Secrets):

| Variable              | Value for this repo (ownit)                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| `GCP_WIF_PROVIDER`    | `projects/804316033885/locations/global/workloadIdentityPools/github-pool/providers/github-provider` |
| `GCP_DEPLOY_SA`       | `ownit-deployer@ownit-afc0f.iam.gserviceaccount.com`                                                  |
| `FIREBASE_PROJECT_ID` | `ownit-afc0f`                                                                                         |

These are Variables, not Secrets — none of them are sensitive, and the workflow
reads them via the `vars.` context, which only resolves from the Variables tab.

## 2. Edit the ymls

In **all three** workflow files, replace the hardcoded strings with `vars.*`.

### Auth step (identical in all three files)

```yaml
# before
      - name: Authenticate to Google Cloud (keyless / OIDC)
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: projects/804316033885/locations/global/workloadIdentityPools/github-pool/providers/github-provider
          service_account: ownit-deployer@ownit-afc0f.iam.gserviceaccount.com

# after
      - name: Authenticate to Google Cloud (keyless / OIDC)
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ vars.GCP_WIF_PROVIDER }}
          service_account: ${{ vars.GCP_DEPLOY_SA }}
```

### Deploy commands (the `--project` flag)

`firebase-hosting-merge.yml`:

```yaml
# before
          firebase deploy --only hosting --project ownit-afc0f --non-interactive
# after
          firebase deploy --only hosting --project "${{ vars.FIREBASE_PROJECT_ID }}" --non-interactive
```

`functions.yml`:

```yaml
# before
          firebase deploy --only functions,firestore:rules,firestore:indexes --project ownit-afc0f --non-interactive
# after
          firebase deploy --only functions,firestore:rules,firestore:indexes --project "${{ vars.FIREBASE_PROJECT_ID }}" --non-interactive
```

`firebase-hosting-pull-request.yml` (inside the preview-deploy step):

```yaml
# before
          firebase hosting:channel:deploy "pr-${{ github.event.number }}" \
            --project ownit-afc0f --expires 7d --json --non-interactive \
# after
          firebase hosting:channel:deploy "pr-${{ github.event.number }}" \
            --project "${{ vars.FIREBASE_PROJECT_ID }}" --expires 7d --json --non-interactive \
```

## 3. (Optional) gate on the variable being set

`gamechangers` also guards each deploy so a repo without the variables set skips
the deploy cleanly instead of failing. If you want that behaviour, add to the
job:

```yaml
    env:
      HAS_WIF: ${{ vars.GCP_WIF_PROVIDER != '' }}
```

then put `if: env.HAS_WIF == 'true'` on the auth + deploy steps (and an optional
"skipping" echo step with `if: env.HAS_WIF != 'true'`). This is only worth it if
you expect to run the workflows in a clone that hasn't been wired up yet.

## Notes

- The `VITE_FIREBASE_*` build inputs stay as `secrets.*` — those are separate
  from the three WIF values above and are unaffected by this change.
- Nothing about the underlying GCP/WIF setup changes; you're only moving where
  the workflow reads the same three strings from.
