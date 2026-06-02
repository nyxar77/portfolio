import "./index.css";
import { useState } from "react";
import logo from "./assets/logo.svg";
import { meta, repoSpotlights, skills } from "./data/portfolio";
import { useGitHub, useGitHubContributions } from "./hooks/useGitHub";

const contactLinks = [
  ...(meta.email
    ? [
        {
          label: "Email",
          value: meta.email,
          href: `mailto:${meta.email}`,
          note: "Main contact",
        },
      ]
    : []),
  {
    label: "GitHub",
    value: "github.com/nyxar77",
    href: meta.github,
    note: "Repos and configs",
  },
];

const principles = [
  "Full-stack apps with React, Django, Laravel, and MySQL.",
  "Automation scripts for scraping, AI-assisted answers, and boring school workflows.",
  "Linux and NixOS configs for my daily machine, editor, shell, and tools.",
];

function timeAgo(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "recently";

  const diff = Date.now() - parsed.getTime();
  const days = Math.floor(diff / 86400000);

  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function WorkSection() {
  const { all, loading, error } = useGitHub("nyxar77");
  const {
    contributions,
    loading: contributionsLoading,
    error: contributionsError,
  } = useGitHubContributions("nyxar77");

  const repoByName = new Map(all.map((repo) => [repo.name.toLowerCase(), repo]));
  const orderedRepos = repoSpotlights.map((spotlight) => ({
    spotlight,
    repo: repoByName.get(spotlight.repo.toLowerCase()) ?? null,
  }));

  const nixpkgsContributions = contributions.filter((item) =>
    item.repository.toLowerCase().includes("nixos/nixpkgs"),
  );
  const visibleContributions =
    nixpkgsContributions.length > 0
      ? nixpkgsContributions.slice(0, 3)
      : contributions.slice(0, 3);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title">Apps, configs, and open source.</h2>
      </div>

      <div className="work-layout">
        <div className="repo-stack" aria-live="polite">
          {loading && (
            <>
              <div className="repo-row skeleton" />
              <div className="repo-row skeleton" />
              <div className="repo-row skeleton" />
            </>
          )}

          {!loading &&
            orderedRepos.map(({ spotlight, repo }, index) => {
              const language = repo?.language ?? "Repository";
              const languageColor = repo?.languageColor ?? "#9399b2";
              const description =
                repo?.description ?? spotlight.fallbackDescription;
              const url =
                repo?.url ?? `https://github.com/nyxar77/${spotlight.repo}`;
              const topics = repo?.topics.slice(0, 4) ?? [];

              return (
                <article
                  className="repo-row"
                  key={spotlight.repo}
                >
                  <div className="repo-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="repo-main">
                    <div className="repo-kicker">
                      <span>{spotlight.label}</span>
                      <span>{spotlight.note}</span>
                    </div>
                    <div className="repo-title-row">
                      <h3>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {repo?.name ?? spotlight.repo}
                        </a>
                      </h3>
                    </div>
                    <p>{description}</p>
                    <div className="repo-tags">
                      <span>
                        <i style={{ backgroundColor: languageColor }} />
                        {language}
                      </span>
                      {topics.map((topic) => (
                        <span key={topic}>#{topic}</span>
                      ))}
                    </div>
                  </div>
                  <dl className="repo-meta">
                    <div>
                      <dt>Stars</dt>
                      <dd>{repo?.stargazerCount ?? "-"}</dd>
                    </div>
                    <div>
                      <dt>Forks</dt>
                      <dd>{repo?.forkCount ?? "-"}</dd>
                    </div>
                    <div>
                      <dt>Updated</dt>
                      <dd>{repo ? timeAgo(repo.updatedAt) : "-"}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}

          {!loading && error && (
            <p className="api-note">
              GitHub data did not load. Showing local fallback text. {error}
            </p>
          )}
        </div>

        <aside className="oss-panel" aria-labelledby="oss-title">
          <p className="eyebrow">Open source</p>
          <h3 id="oss-title">Recent PR activity</h3>
          <p>Fetched from GitHub. Nixpkgs PRs show first when available.</p>

          {contributionsLoading && (
            <div className="oss-list">
              <span className="oss-item skeleton" />
              <span className="oss-item skeleton" />
            </div>
          )}

          {!contributionsLoading && visibleContributions.length > 0 && (
            <div className="oss-list">
              {visibleContributions.map((item) => (
                <a
                  className="oss-item"
                  href={item.url}
                  key={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{item.repository}</span>
                  <strong>{item.title}</strong>
                  <small>
                    {item.state} / {timeAgo(item.updatedAt)}
                  </small>
                </a>
              ))}
            </div>
          )}

          {!contributionsLoading && contributionsError && (
            <p className="api-note">{contributionsError}</p>
          )}

          <a
            className="text-link"
            href="https://github.com/pulls?q=is%3Apr+author%3Anyxar77"
            target="_blank"
            rel="noopener noreferrer"
          >
            View authored PRs
          </a>
        </aside>
      </div>
    </section>
  );
}

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(meta.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${meta.email}`;
    }
  }

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${meta.name} home`}>
          <img src={logo} alt="" />
          <span>{meta.name}</span>
        </a>
        <div className="nav-links">
          <span aria-hidden="true">~/portfolio</span>
          <a href="#work" data-step="01">
            Work
          </a>
          <a href="#skills" data-step="02">
            Skills
          </a>
          <a href="#contact" data-step="03">
            Contact
          </a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{meta.location} / Software Developer</p>
          <h1>{meta.name}</h1>
          <p className="lead">{meta.tagline}</p>
          <p className="bio">{meta.bio}</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">
              View work
            </a>
            <div className="resume-menu">
              <button
                className="button resume"
                type="button"
                aria-expanded={resumeOpen}
                aria-haspopup="menu"
                onClick={() => setResumeOpen((open) => !open)}
              >
                <span aria-hidden="true">↓</span>
                Download resume
              </button>
              {resumeOpen && (
                <div className="resume-dropdown" role="menu">
                  <a
                    href="/resume/Abderrahmane_Drissi_Resume_EN.pdf"
                    download="Abderrahmane_Drissi_Resume_EN.pdf"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                  >
                    English
                  </a>
                  <a
                    href="/resume/Abderrahmane_Drissi_CV_FR.pdf"
                    download="Abderrahmane_Drissi_CV_FR.pdf"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                  >
                    French
                  </a>
                </div>
              )}
            </div>
            <a
              className="button ghost"
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <aside className="signal-panel" aria-label="Profile summary">
          <div className="profile-row">
            <img src={meta.avatar} alt={meta.name} />
            <div>
              <p>{meta.name}</p>
              <span>{meta.title}</span>
            </div>
          </div>
          <dl className="stats">
            <div>
              <dt>Email</dt>
              <dd>
                <button
                  className="stat-copy"
                  type="button"
                  onClick={copyEmail}
                >
                  {meta.email}
                </button>
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Web apps</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>React, Django, Nix</dd>
            </div>
            <div>
              <dt>Study</dt>
              <dd>1st-year engineer at EMSI Rabat</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section intro-section" aria-labelledby="about-title">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2 id="about-title">Projects and tools.</h2>
        </div>
        <div className="intro-grid">
          {principles.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <WorkSection />

      <section id="skills" className="section" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2 id="skills-title">Stack.</h2>
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <article className="skill-card" key={group.category}>
              <h3>{group.category}</h3>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="section contact"
        aria-labelledby="contact-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Contact.</h2>
        </div>
        <div className="contact-card">
          <p>Email me or check the GitHub repos.</p>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                <span>{link.label}</span>
                <strong>{link.value}</strong>
                <small>{link.note}</small>
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className={`toast${copied ? " is-visible" : ""}`} role="status">
        copied to <span className="clipboard-icon" aria-label="clipboard" />
      </div>
    </main>
  );
}
