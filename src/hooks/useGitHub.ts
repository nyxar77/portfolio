// import { BEARER_TOKEN } from "@/env";
import { useState, useEffect } from "react";
import { repoSpotlights } from "@/data/portfolio";

export interface LangSegment {
  name: string;
  pct: number;
  color: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  languageColor: string;
  languageBreakdown: LangSegment[];
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

export interface GitHubContribution {
  title: string;
  url: string;
  repository: string;
  state: string;
  updatedAt: string;
}

interface UseGitHubContributionsResult {
  contributions: GitHubContribution[];
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

function computeBreakdown(
  edges: { size: number; node: { name: string } }[],
): LangSegment[] {
  if (!edges || edges.length === 0) return [];
  const total = edges.reduce((sum, e) => sum + e.size, 0);
  if (total === 0) return [];
  return edges
    .sort((a, b) => b.size - a.size)
    .map((e) => ({
      name: e.node.name,
      pct: Math.round((e.size / total) * 100),
      color: getLanguageColor(e.node.name),
    }))
    .filter((s) => s.pct > 0);
}

async function fetchAllRepos(USERNAME: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();

  return data.map((r: any): GitHubRepo => {
    const lang = r.language ?? null;
    return {
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: lang,
      languageColor: getLanguageColor(lang),
      languageBreakdown: [],
      stargazerCount: r.stargazers_count,
      forkCount: r.forks_count,
      topics: r.topics ?? [],
      updatedAt: r.updated_at,
      isArchived: r.archived,
      isPinned: false,
    };
  });
}

export function useGitHub(username: string): UseGitHubResult {
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
        const allData = await fetchAllRepos(username);

        if (cancelled) return;

        const pinnedNames = new Set(
          repoSpotlights.map((spotlight) => spotlight.repo.toLowerCase()),
        );
        const allMarked = allData.map((r) => ({
          ...r,
          isPinned: pinnedNames.has(r.name.toLowerCase()),
        }));

        setPinned(allMarked.filter((r) => r.isPinned));
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

export function useGitHubContributions(
  username: string,
): UseGitHubContributionsResult {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const query = encodeURIComponent(`type:pr author:${username}`);
        const res = await fetch(
          `https://api.github.com/search/issues?q=${query}&sort=updated&order=desc&per_page=6`,
          { headers: { Accept: "application/vnd.github+json" } },
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        const data = await res.json();
        if (cancelled) return;

        setContributions(
          (data.items ?? []).map((item: any): GitHubContribution => {
            const [, owner, repo] =
              item.repository_url.match(/repos\/([^/]+)\/([^/]+)$/) ?? [];

            return {
              title: item.title,
              url: item.html_url,
              repository: owner && repo ? `${owner}/${repo}` : "unknown repo",
              state: item.state,
              updatedAt: item.updated_at,
            };
          }),
        );
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? "Failed to load PRs");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { contributions, loading, error };
}
