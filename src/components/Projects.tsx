import { useState } from "react";
import { useGitHub, getLanguageColor } from "../hooks/useGitHub";
import type { GitHubRepo } from "../hooks/useGitHub";
import type { Theme } from "../hooks/useTheme";

interface ProjectsProps {
  theme: Theme;
}

type Tab = "pinned" | "all";

function RepoCard({ repo, theme }: { repo: GitHubRepo; theme: Theme }) {
  const red = theme === "dark" ? "#f38ba8" : "#d20f39";
  const subtext = theme === "dark" ? "#9399b2" : "#6c6f85";
  const surface = theme === "dark" ? "#313244" : "#ccd0da";
  const mantle = theme === "dark" ? "#181825" : "#e6e9ef";
  const base = theme === "dark" ? "#1e1e2e" : "#eff1f5";

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days < 1) return "today";
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        background: mantle,
        border: `1px solid ${surface}`,
        borderRadius: "12px",
        padding: "20px 24px",
        textDecoration: "none",
        transition:
          "border-color 0.2s ease, transform 0.2s ease, background 0.2s ease",
        cursor: "pointer",
        opacity: repo.isArchived ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor =
          theme === "dark" ? "rgba(243,139,168,0.45)" : "rgba(210,15,57,0.35)";
        el.style.background = base;
        el.style.transform = "translateX(6px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = surface;
        el.style.background = mantle;
        el.style.transform = "translateX(0)";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "14px",
              fontWeight: 600,
              color: red,
            }}
          >
            {repo.name}
          </span>
          {repo.isPinned && (
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "10px",
                color: red,
                background:
                  theme === "dark"
                    ? "rgba(243,139,168,0.12)"
                    : "rgba(210,15,57,0.08)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              pinned
            </span>
          )}
          {repo.isArchived && (
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "10px",
                color: subtext,
                background: surface,
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              archived
            </span>
          )}
        </div>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "11px",
            color: subtext,
            whiteSpace: "nowrap",
            marginLeft: "12px",
          }}
        >
          {timeAgo(repo.updatedAt)}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "Geist, Inter, sans-serif",
          fontSize: "14px",
          lineHeight: 1.6,
          color: subtext,
          marginBottom: "16px",
          minHeight: "22px",
        }}
      >
        {repo.description ?? (
          <span style={{ fontStyle: "italic" }}>no description</span>
        )}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {repo.language && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "12px",
                color: subtext,
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: getLanguageColor(repo.language),
                  display: "inline-block",
                }}
              />
              {repo.language}
            </span>
          )}
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12px",
              color: subtext,
            }}
          >
            ★ {repo.stargazerCount}
          </span>
          {repo.forkCount > 0 && (
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "12px",
                color: subtext,
              }}
            >
              ⑂ {repo.forkCount}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {repo.topics.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "10px",
                color: subtext,
                background: surface,
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export function Projects({ theme }: ProjectsProps) {
  const [tab, setTab] = useState<Tab>("pinned");
  const { pinned, all, loading, error } = useGitHub();

  const red = theme === "dark" ? "#f38ba8" : "#d20f39";
  const text = theme === "dark" ? "#cdd6f4" : "#4c4f69";
  const subtext = theme === "dark" ? "#9399b2" : "#6c6f85";
  const surface = theme === "dark" ? "#313244" : "#ccd0da";
  const mantle = theme === "dark" ? "#181825" : "#e6e9ef";

  const repos = tab === "pinned" ? pinned : all;

  return (
    <section
      style={{ minHeight: "100vh", padding: "80px 60px", maxWidth: "760px" }}
    >
      {/* Header */}
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "13px",
          color: subtext,
          marginBottom: "12px",
        }}
      >
        <span style={{ color: red }}>~/</span> ls -la projects/
      </p>
      <h2
        style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: "40px",
          fontWeight: 800,
          color: text,
          marginBottom: "32px",
          letterSpacing: "-1px",
        }}
      >
        Projects<span style={{ color: red }}>_</span>
      </h2>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "28px",
          background: mantle,
          border: `1px solid ${surface}`,
          borderRadius: "10px",
          padding: "4px",
          width: "fit-content",
        }}
      >
        {(["pinned", "all"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12px",
              padding: "6px 16px",
              borderRadius: "7px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.15s ease, color 0.15s ease",
              background:
                tab === t
                  ? theme === "dark"
                    ? "rgba(243,139,168,0.18)"
                    : "rgba(210,15,57,0.12)"
                  : "transparent",
              color: tab === t ? red : subtext,
            }}
          >
            {t === "pinned"
              ? `pinned (${pinned.length})`
              : `all (${all.length})`}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: mantle,
                border: `1px solid ${surface}`,
                borderRadius: "12px",
                padding: "20px 24px",
                height: "110px",
                opacity: 0.5,
              }}
            />
          ))}
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12px",
              color: subtext,
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            fetching from github...
          </p>
        </div>
      )}

      {error && !loading && (
        <div
          style={{
            background: mantle,
            border: `1px solid ${theme === "dark" ? "rgba(243,139,168,0.3)" : "rgba(210,15,57,0.3)"}`,
            borderRadius: "12px",
            padding: "20px 24px",
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "13px",
              color: red,
              marginBottom: "6px",
            }}
          >
            ! failed to load
          </p>
          <p
            style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: "13px",
              color: subtext,
            }}
          >
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {repos.length === 0 && (
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "13px",
                color: subtext,
              }}
            >
              no repos found
            </p>
          )}
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} theme={theme} />
          ))}
        </div>
      )}

      {/* Footer link */}
      {!loading && (
        <div style={{ marginTop: "32px" }}>
          <a
            href="https://github.com/nyxar77?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "13px",
              color: subtext,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = red;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = subtext;
            }}
          >
            view on github →
          </a>
        </div>
      )}
    </section>
  );
}
