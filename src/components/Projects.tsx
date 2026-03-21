import { useState, useEffect, useRef } from "react";
import {
  useGitHub,
  type GitHubRepo,
  type LangSegment,
} from "@/hooks/useGitHub";
import type { Theme } from "@/hooks/useTheme";

interface ProjectsProps {
  theme: Theme;
}

type Tab = "pinned" | "all";

function getLangSegments(repo: GitHubRepo): LangSegment[] {
  if (repo.languageBreakdown.length > 0) return repo.languageBreakdown;
  if (repo.language) {
    return [{ name: repo.language, pct: 100, color: repo.languageColor }];
  }
  return [];
}

function timeAgo(date: string) {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "invalid date";

  const diff = Date.now() - parsed.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

interface RepoItemProps {
  repo: GitHubRepo;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  theme: Theme;
}

function RepoItem({ repo, index, isOpen, onToggle, theme }: RepoItemProps) {
  const dark = theme === "dark";
  const red = dark ? "#f38ba8" : "#d20f39";
  const redG = dark ? "rgba(243,139,168,0.11)" : "rgba(210,15,57,0.13)";
  const redGS = dark ? "rgba(243,139,168,0.2)" : "rgba(210,15,57,0.22)";
  const sub = dark ? "#9399b2" : "#6c6f85";
  const surface = dark ? "#313244" : "#ccd0da";
  const mantle = dark ? "#181825" : "#e6e9ef";

  const bodyRef = useRef<HTMLDivElement>(null);
  const langs = getLangSegments(repo);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.maxHeight = isOpen ? el.scrollHeight + "px" : "0px";
  }, [isOpen]);

  return (
    <div
      style={{
        borderRadius: "10px",
        border: `1px solid ${isOpen ? red : surface}`,
        background: mantle,
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: isOpen
          ? `0 0 0 1px ${redG}, 0 4px 24px ${redG}, inset 0 0 32px ${redG}`
          : "none",
        position: "relative",
        opacity: repo.isArchived ? 0.55 : 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${redGS}, transparent 65%)`,
          pointerEvents: "none",
          zIndex: 0,
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          cursor: "pointer",
          userSelect: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "10px",
            color: sub,
            opacity: 0.35,
            width: "26px",
            flexShrink: 0,
          }}
        >
          {String(index).padStart(2, "0")}
        </span>

        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "12px",
            color: isOpen ? red : sub,
            marginRight: "10px",
            flexShrink: 0,
            display: "inline-block",
            transition: "transform 0.22s ease, color 0.15s",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          ›
        </span>

        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "13px",
            fontWeight: 700,
            color: red,
            minWidth: "130px",
            marginRight: "14px",
            flexShrink: 0,
          }}
        >
          {repo.name}
        </span>

        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "11px",
            color: sub,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            opacity: isOpen ? 0 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {repo.description ?? "no description"}
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginLeft: "14px",
            flexShrink: 0,
          }}
        >
          {repo.language && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "10px",
                color: sub,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: repo.languageColor,
                  display: "inline-block",
                }}
              />
              {repo.language}
            </span>
          )}
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "10px",
              color: sub,
            }}
          >
            ★ {repo.stargazerCount}
          </span>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "10px",
              color: sub,
              opacity: 0.45,
              minWidth: "48px",
              textAlign: "right",
            }}
          >
            {timeAgo(repo.updatedAt)}
          </span>

          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "13px",
              color: sub,
              textDecoration: "none",
              padding: "3px 7px",
              borderRadius: "5px",
              marginLeft: "2px",
              transition: "color 0.15s, background 0.15s",
              position: "relative",
              zIndex: 2,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = red;
              el.style.background = redG;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = sub;
              el.style.background = "transparent";
            }}
          >
            ↗
          </a>
        </div>
      </div>

      <div
        ref={bodyRef}
        style={{
          maxHeight: 0,
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            padding: "0 16px 20px 52px",
            borderTop: `1px solid ${
              isOpen
                ? dark
                  ? "rgba(243,139,168,0.2)"
                  : "rgba(210,15,57,0.18)"
                : surface
            }`,
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12px",
              color: sub,
              lineHeight: 1.75,
              margin: "14px 0 18px",
            }}
          >
            {repo.description ?? <em>no description</em>}
          </p>

          {langs.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  height: "3px",
                  borderRadius: "2px",
                  display: "flex",
                  gap: "2px",
                  overflow: "hidden",
                  marginBottom: "8px",
                }}
              >
                {langs.map((l) => (
                  <div
                    key={l.name}
                    style={{
                      flex: l.pct,
                      background: l.color,
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {langs.map((l) => (
                  <span
                    key={l.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: "10px",
                      color: sub,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: l.color,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {l.name}
                    {langs.length > 1 ? ` ${l.pct}%` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "14px" }}>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "11px",
                  color: sub,
                }}
              >
                ★ {repo.stargazerCount}
              </span>
              {repo.forkCount > 0 && (
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "11px",
                    color: sub,
                  }}
                >
                  ⑂ {repo.forkCount}
                </span>
              )}
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "11px",
                  color: sub,
                  opacity: 0.5,
                }}
              >
                {timeAgo(repo.updatedAt)}
              </span>
            </div>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {repo.topics.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "10px",
                    color: sub,
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
        </div>
      </div>
    </div>
  );
}

function Skeletons({ theme }: { theme: Theme }) {
  const dark = theme === "dark";
  const surface = dark ? "#313244" : "#ccd0da";
  const mantle = dark ? "#181825" : "#e6e9ef";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            background: mantle,
            border: `1px solid ${surface}`,
            borderRadius: "10px",
            opacity: 1 - i * 0.15,
          }}
        >
          <div
            style={{
              width: 20,
              height: 10,
              background: surface,
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              background: surface,
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: 110,
              height: 13,
              background: surface,
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 11,
              background: surface,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              width: 70,
              height: 10,
              background: surface,
              borderRadius: 3,
              flexShrink: 0,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function Projects({ theme }: ProjectsProps) {
  const [tab, setTab] = useState<Tab>("pinned");
  const [openIndex, setOpenIndex] = useState<number>(0);
  const { pinned, all, loading, error } = useGitHub("nyxar77");

  const dark = theme === "dark";
  const red = dark ? "#f38ba8" : "#d20f39";
  const text = dark ? "#cdd6f4" : "#4c4f69";
  const sub = dark ? "#9399b2" : "#6c6f85";
  const surface = dark ? "#313244" : "#ccd0da";
  const mantle = dark ? "#181825" : "#e6e9ef";

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenIndex(0);
  }, [tab]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    const t = setTimeout(() => {
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 40);
    return () => clearTimeout(t);
  }, []);

  const repos = tab === "pinned" ? pinned : all;

  const handleToggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <>
      <style>{`
        @keyframes projBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        .proj-cursor { animation: projBlink 1.1s step-end infinite; }
        .proj-tab {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; padding: 5px 14px;
          border-radius: 6px; cursor: pointer;
          background: transparent;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .proj-view-all { transition: color 0.15s; }
        .proj-view-all:hover { color: ${red} !important; }
      `}</style>

      <section
        ref={sectionRef}
        style={{ minHeight: "100vh", padding: "80px 60px", maxWidth: "760px" }}
      >
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "13px",
            color: sub,
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
            marginBottom: "24px",
            letterSpacing: "-1px",
          }}
        >
          Projects
          <span className="proj-cursor" style={{ color: red }}>
            _
          </span>
        </h2>

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
          {(["pinned", "all"] as Tab[]).map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                className="proj-tab"
                onClick={() => setTab(t)}
                style={{
                  border: active ? `1px solid ${red}` : "1px solid transparent",
                  background: active
                    ? dark
                      ? "rgba(243,139,168,0.15)"
                      : "rgba(210,15,57,0.1)"
                    : "transparent",
                  color: active ? red : sub,
                }}
              >
                {t === "pinned"
                  ? `pinned (${pinned.length})`
                  : `all (${all.length})`}
              </button>
            );
          })}
        </div>

        {loading && <Skeletons theme={theme} />}

        {error && !loading && (
          <div
            style={{
              background: mantle,
              border: `1px solid ${dark ? "rgba(243,139,168,0.3)" : "rgba(210,15,57,0.3)"}`,
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
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "13px",
                color: sub,
              }}
            >
              {error}
            </p>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "13px",
              color: sub,
            }}
          >
            no repos found
          </p>
        )}

        {!loading && !error && repos.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {repos.map((repo, i) => (
              <RepoItem
                key={repo.name}
                repo={repo}
                index={i + 1}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
                theme={theme}
              />
            ))}
          </div>
        )}

        {!loading && (
          <div style={{ marginTop: "28px" }}>
            <a
              className="proj-view-all"
              href="https://github.com/nyxar77?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "13px",
                color: sub,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              view all on github →
            </a>
          </div>
        )}
      </section>
    </>
  );
}
