import "./index.css";
import { useState } from "react";
import { useLanguage, translate, timeAgo, type Language } from "./hooks/useLanguage";
import { LanguageSelector } from "./components/LanguageSelector";
import logo from "./assets/logo.svg";
import { meta, repoSpotlights, skills } from "./data/portfolio";
import { useGitHub, useGitHubContributions } from "./hooks/useGitHub";

const principles = [
  "Local-first apps for Android and the web, with offline data, tracking, and import/export.",
  "Linux tooling with CLI workflows, desktop integrations, Hyprland, and Nix/Home Manager.",
  "Browser extensions and automation that remove repetitive work from everyday workflows.",
];

function WorkSection({ language }: { language: Language }) {
  const t = (text: string) => translate(text, language);
  const { all, loading, error } = useGitHub("nyxar77");
  const {
    contributions,
    loading: contributionsLoading,
    error: contributionsError,
  } = useGitHubContributions("nyxar77");

  const repoByName = new Map(
    all.map((repo) => [repo.name.toLowerCase(), repo]),
  );
  const orderedRepos = repoSpotlights.map((spotlight) => ({
    spotlight,
    repo: repoByName.get(spotlight.repo.toLowerCase()) ?? null,
  }));

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">{t("Selected work")}</p>
        <h2 id="work-title">{t("Apps, configs, and open source.")}</h2>
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
              const repoLanguage = repo?.language ?? t("Repository");
              const languageColor = repo?.languageColor ?? "#9399b2";
              const description = t(spotlight.fallbackDescription);
              const url =
                repo?.url ?? `https://github.com/nyxar77/${spotlight.repo}`;
              const topics = repo?.topics.slice(0, 4) ?? [];

              return (
                <article className="repo-row" key={spotlight.repo}>
                  <div className="repo-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="repo-main">
                    <div className="repo-kicker">
                      <span>{t(spotlight.label)}</span>
                      <span>{t(spotlight.note)}</span>
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
                        {repoLanguage}
                      </span>
                      {topics.map((topic) => (
                        <span key={topic}>#{topic}</span>
                      ))}
                    </div>
                  </div>
                  <dl className="repo-meta">
                    <div>
                      <dt>{t("Stars")}</dt>
                      <dd>{repo?.stargazerCount ?? "-"}</dd>
                    </div>
                    <div>
                      <dt>{t("Forks")}</dt>
                      <dd>{repo?.forkCount ?? "-"}</dd>
                    </div>
                    <div>
                      <dt>{t("Updated")}</dt>
                      <dd>{repo ? timeAgo(repo.updatedAt, language) : "-"}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}

          {!loading && error && (
            <p className="api-note">
              {t("GitHub data did not load. Showing local fallback text.")}
            </p>
          )}
        </div>

        <aside className="oss-panel" aria-labelledby="oss-title">
          <p className="eyebrow">Open source</p>
          <h3 id="oss-title">{t("Recent PR activity")}</h3>
          <p>{t("Recent contributions across different open-source projects.")}</p>

          {contributionsLoading && (
            <div className="oss-list">
              <span className="oss-item skeleton" />
              <span className="oss-item skeleton" />
            </div>
          )}

          {!contributionsLoading && contributions.length > 0 && (
            <div className="oss-list">
              {contributions.map((item) => (
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
                    {t(item.state)} / {timeAgo(item.updatedAt, language)}
                  </small>
                </a>
              ))}
            </div>
          )}

          {!contributionsLoading && contributionsError && (
            <p className="api-note">{t("Unable to load recent contributions.")}</p>
          )}

          <a
            className="text-link"
            href="https://github.com/pulls?q=is%3Apr+author%3Anyxar77"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("View authored PRs")}
          </a>
        </aside>
      </div>
    </section>
  );
}

export default function App() {
  const { language, preference, setPreference } = useLanguage();
  const t = (text: string) => translate(text, language);
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
      <LanguageSelector language={language} preference={preference} onChange={setPreference} />
      <nav className="topbar" aria-label={t("Primary navigation")}>
        <a className="brand" href="#top" aria-label={`${meta.name} ${t("home")}`}>
          <img src={logo} alt="" />
          <span>{meta.name}</span>
        </a>
        <div className="nav-links">
          <span aria-hidden="true">~/portfolio</span>
          <a href="#work">{t("Work")}</a>
          <a href="#skills">{t("Skills")}</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t(meta.location)} / {t("Software Developer")}</p>
          <h1>{meta.name}</h1>
          <p className="lead">{t(meta.tagline)}</p>
          <p className="bio">{t(meta.bio)}</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">
              {t("View work")}
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
                {t("Download resume")}
              </button>
              {resumeOpen && (
                <div className="resume-dropdown" role="menu">
                  <a
                    href="/resume/Abderrahmane_Drissi_Resume_EN.pdf"
                    download="Abderrahmane_Drissi_Resume_EN.pdf"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                  >
                    {t("English")}
                  </a>
                  <a
                    href="/resume/Abderrahmane_Drissi_CV_FR.pdf"
                    download="Abderrahmane_Drissi_CV_FR.pdf"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                  >
                    {t("French")}
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

        <aside className="signal-panel" aria-label={t("Profile summary")}>
          <div className="profile-row">
            <img src={meta.avatar} alt={meta.name} />
            <div>
              <p>{meta.name}</p>
              <span>{t(meta.title)}</span>
            </div>
          </div>
          <dl className="stats">
            <div>
              <dt>{t("Email")}</dt>
              <dd>
                <button className="stat-copy" type="button" onClick={copyEmail}>
                  {meta.email}
                </button>
              </dd>
            </div>
            <div>
              <dt>{t("Focus")}</dt>
              <dd>{t("Web apps")}</dd>
            </div>
            <div>
              <dt>{t("Areas")}</dt>
              <dd>Web, Android, Linux</dd>
            </div>
            <div>
              <dt>{t("Study")}</dt>
              <dd>{t("Engineering student at EMSI Rabat")}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="section intro-section" aria-labelledby="about-title">
        <div className="section-heading">
          <p className="eyebrow">{t("About")}</p>
          <h2 id="about-title">{t("Projects and tools.")}</h2>
        </div>
        <div className="intro-grid">
          {principles.map((item) => (
            <p key={item}>{t(item)}</p>
          ))}
        </div>
      </section>

      <WorkSection language={language} />

      <section id="skills" className="section" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">{t("Capabilities")}</p>
          <h2 id="skills-title">{t("Stack.")}</h2>
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <article className="skill-card" key={group.category}>
              <h3>{t(group.category)}</h3>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{t(item)}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>{t("That’s all. Thanks for looking :)")}</p>
      </footer>
      <div className={`toast${copied ? " is-visible" : ""}`} role="status">
        {t("copied to")} <span className="clipboard-icon" aria-label={t("clipboard")} />
      </div>
    </main>
  );
}
