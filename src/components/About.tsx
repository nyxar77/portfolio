import { meta } from "@/data/portfolio";
import type { Theme } from "@/hooks/useTheme";

interface AboutProps {
  theme: Theme;
}

export function About({ theme }: AboutProps) {
  const red = theme === "dark" ? "#f38ba8" : "#d20f39";
  const text = theme === "dark" ? "#cdd6f4" : "#4c4f69";
  const subtext = theme === "dark" ? "#9399b2" : "#6c6f85";
  const surface = theme === "dark" ? "#313244" : "#ccd0da";
  const mantle = theme === "dark" ? "#181825" : "#e6e9ef";

  return (
    <section
      style={{ minHeight: "100vh", padding: "80px 60px", maxWidth: "760px" }}
    >
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "13px",
          color: subtext,
          marginBottom: "20px",
        }}
      >
        <span style={{ color: red }}>~/</span> whoami
      </p>

      <h1
        style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: "clamp(48px, 8vw, 80px)",
          fontWeight: 800,
          lineHeight: 1,
          color: text,
          marginBottom: "12px",
          letterSpacing: "-2px",
        }}
      >
        {meta.name}
        <span style={{ color: red }}>.</span>
      </h1>

      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "16px",
          color: red,
          marginBottom: "40px",
          letterSpacing: "0.05em",
        }}
      >
        {meta.title}
      </p>

      <div
        style={{
          borderLeft: `2px solid ${red}`,
          paddingLeft: "24px",
          marginBottom: "40px",
        }}
      >
        <p
          style={{
            fontFamily: "Geist, Inter, sans-serif",
            fontSize: "16px",
            lineHeight: 1.75,
            color: subtext,
          }}
        >
          {meta.bio}
        </p>
      </div>

      <div
        style={{
          display: "inline-block",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "13px",
          color: red,
          background:
            theme === "dark"
              ? "rgba(243,139,168,0.08)"
              : "rgba(210,15,57,0.07)",
          border: `1px solid ${theme === "dark" ? "rgba(243,139,168,0.2)" : "rgba(210,15,57,0.2)"}`,
          borderRadius: "8px",
          padding: "10px 16px",
          marginBottom: "40px",
        }}
      >
        <span style={{ color: subtext }}>// </span>
        {meta.tagline}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "12px",
            color: subtext,
            background: surface,
            borderRadius: "999px",
            padding: "6px 14px",
          }}
        >
          ◎ {meta.location}
        </span>
        <a
          href={meta.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "12px",
            color: subtext,
            background: surface,
            borderRadius: "999px",
            padding: "6px 14px",
            textDecoration: "none",
          }}
        >
          ⌥ github.com/nyxar77
        </a>
      </div>

      <div
        style={{
          marginTop: "60px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          background: mantle,
          border: `1px solid ${surface}`,
          borderRadius: "16px",
          padding: "20px 24px",
          maxWidth: "360px",
        }}
      >
        <img
          src={meta.avatar}
          alt={meta.name}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: `2px solid ${red}`,
            objectFit: "cover",
          }}
        />
        <div>
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "14px",
              fontWeight: 600,
              color: text,
            }}
          >
            {meta.name}
          </p>
          <p
            style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: "12px",
              color: subtext,
              marginTop: "2px",
            }}
          >
            {meta.title}
          </p>
        </div>
      </div>
    </section>
  );
}
