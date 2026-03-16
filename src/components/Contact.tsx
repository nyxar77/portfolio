import { meta } from "../data/portfolio";
import type { Theme } from "../hooks/useTheme";

interface ContactProps {
  theme: Theme;
}

export function Contact({ theme }: ContactProps) {
  const red = theme === "dark" ? "#f38ba8" : "#d20f39";
  const text = theme === "dark" ? "#cdd6f4" : "#4c4f69";
  const subtext = theme === "dark" ? "#9399b2" : "#6c6f85";
  const surface = theme === "dark" ? "#313244" : "#ccd0da";
  const mantle = theme === "dark" ? "#181825" : "#e6e9ef";

  const links = [
    {
      label: "GitHub",
      value: "github.com/nyxar77",
      href: meta.github,
      icon: "⌥",
    },
    ...(meta.email
      ? [
          {
            label: "Email",
            value: meta.email,
            href: `mailto:${meta.email}`,
            icon: "✉",
          },
        ]
      : []),
  ];

  return (
    <section
      style={{ minHeight: "100vh", padding: "80px 60px", maxWidth: "760px" }}
    >
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "13px",
          color: subtext,
          marginBottom: "12px",
        }}
      >
        <span style={{ color: red }}>~/</span> ping contact
      </p>
      <h2
        style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: "40px",
          fontWeight: 800,
          color: text,
          marginBottom: "48px",
          letterSpacing: "-1px",
        }}
      >
        Contact<span style={{ color: red }}>_</span>
      </h2>

      <div
        style={{
          borderLeft: `2px solid ${red}`,
          paddingLeft: "24px",
          marginBottom: "48px",
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
          Want to collaborate, chat about configs, or just say hi? You know
          where to find me.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: mantle,
              border: `1px solid ${surface}`,
              borderRadius: "12px",
              padding: "18px 24px",
              textDecoration: "none",
              transition: "border-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor =
                theme === "dark"
                  ? "rgba(243,139,168,0.45)"
                  : "rgba(210,15,57,0.35)";
              el.style.transform = "translateX(6px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = surface;
              el.style.transform = "translateX(0)";
            }}
          >
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "20px",
                color: red,
              }}
            >
              {link.icon}
            </span>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "11px",
                  color: subtext,
                  marginBottom: "3px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {link.label}
              </p>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "14px",
                  color: text,
                }}
              >
                {link.value}
              </p>
            </div>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "16px",
                color: subtext,
              }}
            >
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
