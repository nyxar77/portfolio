import { useState, useEffect } from "react";

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stargazerCount: number;
  forkCount: number;
  topics: string[];
  updatedAt: string;
  isArchived: boolean;
  isPinned: boolean;
}

interface UseGitHubResult {
  pinned: GitHubRepo[];
  all: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Lua: "#000080",
  Nix: "#7e7eff",
  Shell: "#89e051",
  Bash: "#89e051",
  CSS: "#563d7c",
  HTML: "#e34c26",
  C: "#555555",
  "C++": "#f34b7d",
  Ruby: "#701516",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
};

export function getLanguageColor(lang: string | null): string {
  if (!lang) return "#9399b2";
  return LANGUAGE_COLORS[lang] ?? "#9399b2";
}

const USERNAME = "nyxar77";

// GitHub GraphQL — fetches pinned repos (no token needed for public data)
async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  const query = `{
    user(login: "${USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage { name }
            repositoryTopics(first: 5) { nodes { topic { name } } }
            updatedAt
            isArchived
          }
        }
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  // GraphQL endpoint requires auth — fall back gracefully
  if (!res.ok) return [];

  const json = await res.json();
  const nodes = json?.data?.user?.pinnedItems?.nodes ?? [];

  return nodes.map(
    (r: any): GitHubRepo => ({
      name: r.name,
      description: r.description,
      url: r.url,
      language: r.primaryLanguage?.name ?? null,
      stargazerCount: r.stargazerCount,
      forkCount: r.forkCount,
      topics: r.repositoryTopics?.nodes?.map((t: any) => t.topic.name) ?? [],
      updatedAt: r.updatedAt,
      isArchived: r.isArchived,
      isPinned: true,
    }),
  );
}

// GitHub REST — public repos, no auth required
async function fetchAllRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();

  return data.map(
    (r: any): GitHubRepo => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stargazerCount: r.stargazers_count,
      forkCount: r.forks_count,
      topics: r.topics ?? [],
      updatedAt: r.updated_at,
      isArchived: r.archived,
      isPinned: false,
    }),
  );
}

export function useGitHub(): UseGitHubResult {
  const [pinned, setPinned] = useState<GitHubRepo[]>([]);
  const [all, setAll] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Both fetches in parallel; pinned may silently return [] if GraphQL
        // requires auth — REST always works for public profiles
        const [pinnedData, allData] = await Promise.all([
          fetchPinnedRepos().catch(() => []),
          fetchAllRepos(),
        ]);

        if (cancelled) return;

        // Mark pinned repos in the all-repos list too
        const pinnedNames = new Set(pinnedData.map((r) => r.name));
        const allMarked = allData.map((r) => ({
          ...r,
          isPinned: pinnedNames.has(r.name),
        }));

        // If GraphQL failed (no auth), infer pinned from the hardcoded list below
        // so the UI still has a "pinned" tab that makes sense
        const finalPinned =
          pinnedData.length > 0
            ? pinnedData
            : allMarked.filter((r) => FALLBACK_PINNED.includes(r.name));

        setPinned(finalPinned);
        setAll(allMarked);
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? "Failed to load repos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { pinned, all, loading, error };
}

// Fallback pinned list (used when GraphQL auth is unavailable)
// Update this to match your actual pinned repos on GitHub
const FALLBACK_PINNED = [
  "WebScrapper---Altissia",
  "nixosconfig",
  "neovimconfig",
];
