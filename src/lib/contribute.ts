import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export interface ContributionInput {
  idea: string;
  name?: string;
  email?: string;
}

const callable = httpsCallable<ContributionInput, { status: 'ok'; issue: number }>(
  functions,
  'submitContribution',
);

/** Posts a contribution, which the backend turns into a GitHub Issue. */
export async function submitContribution(input: ContributionInput): Promise<number> {
  const res = await callable(input);
  return res.data.issue;
}
