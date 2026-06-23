// Creates GitHub Issues from public contribution submissions, using a
// server-side token (never exposed to the client). The OwnIt repo lives at
// github.com/miggle/ownit, so contributions land there as triaged issues.
export const GITHUB_OWNER = 'miggle';
export const GITHUB_REPO = 'ownit';
export const CONTRIBUTION_LABEL = 'contribution';

export interface NewIssue {
  title: string;
  body: string;
}

/** Creates an issue and returns its number + URL. Throws on a non-2xx response. */
export async function createIssue(token: string, issue: NewIssue): Promise<{ number: number; url: string }> {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'ownit-contributions',
    },
    body: JSON.stringify({ title: issue.title, body: issue.body, labels: [CONTRIBUTION_LABEL] }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`GitHub issue creation failed (${res.status}): ${detail.slice(0, 300)}`);
  }
  const data = (await res.json()) as { number: number; html_url: string };
  return { number: data.number, url: data.html_url };
}
