const GITHUB_API = 'https://api.github.com';

function getRepoInfo() {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME || 'imigo-website';
  if (!owner) throw new Error('GITHUB_REPO_OWNER not set');
  return { owner, repo };
}

function getToken() {
  const token = process.env.GITHUB_PAT;
  if (!token) throw new Error('GITHUB_PAT not set');
  return token;
}

function headers() {
  return {
    Authorization: `Bearer ${getToken()}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: 'file' | 'dir';
}

export interface FileContent {
  content: string;
  sha: string;
  path: string;
}

export async function listContentFiles(type: 'blog' | 'events'): Promise<GitHubFile[]> {
  const { owner, repo } = getRepoInfo();
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/content/${type}`,
    { headers: headers(), cache: 'no-store' }
  );

  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

export async function getFileContent(path: string): Promise<FileContent> {
  const { owner, repo } = getRepoInfo();
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
    { headers: headers(), cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');

  return { content, sha: data.sha, path: data.path };
}

export async function createFile(
  path: string,
  content: string,
  message: string
): Promise<void> {
  const { owner, repo } = getRepoInfo();
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  }
}

export async function updateFile(
  path: string,
  content: string,
  sha: string,
  message: string
): Promise<void> {
  const { owner, repo } = getRepoInfo();
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  }
}

export async function deleteFile(
  path: string,
  sha: string,
  message: string
): Promise<void> {
  const { owner, repo } = getRepoInfo();
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({ message, sha }),
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  }
}
