/**
 * Fetch AWS credentials from the central Miggle Vault (GCP project: miggle-vault)
 * at runtime. We use the Secret Manager client directly (not Firebase's
 * defineSecret) because defineSecret only supports secrets in the current
 * project — the vault lives in a different project, shared across Miggle apps.
 *
 * Requires the function's runtime service account to have the
 * "Secret Manager Secret Accessor" role on the miggle-vault project.
 * (Same pattern as the endgame project.)
 */
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const VAULT_PROJECT = 'miggle-vault';
const client = new SecretManagerServiceClient();

function vaultSecretName(secretId: string): string {
  return `projects/${VAULT_PROJECT}/secrets/${secretId}/versions/latest`;
}

export interface AwsSecrets {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
}

/** Per-instance cache so we don't hit Secret Manager on every invocation. */
let cached: AwsSecrets | null = null;

export async function getAwsSecrets(): Promise<AwsSecrets> {
  if (cached) return cached;
  const [awsAccessKeyId, awsSecretAccessKey] = await Promise.all([
    accessSecret(vaultSecretName('AWS_ACCESS_KEY_ID')),
    accessSecret(vaultSecretName('AWS_SECRET_ACCESS_KEY')),
  ]);
  cached = { awsAccessKeyId: awsAccessKeyId.trim(), awsSecretAccessKey: awsSecretAccessKey.trim() };
  return cached;
}

async function accessSecret(name: string): Promise<string> {
  const [version] = await client.accessSecretVersion({ name });
  const payload = version.payload?.data;
  if (!payload) throw new Error(`Secret ${name} has no payload`);
  return typeof payload === 'string' ? payload : Buffer.from(payload).toString('utf8');
}
