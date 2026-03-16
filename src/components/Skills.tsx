import { skills } from "../data/portfolio";
import type { Theme } from "../hooks/useTheme";

interface SkillsProps {
  theme: Theme;
}

export function Skills({ theme }: SkillsProps) {
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
          marginBottom: "12px",
        }}
      >
        <span style={{ color: red }}>~/</span> cat skills.json
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
        Skills<span style={{ color: red }}>_</span>
      </h2>

      <div style={{ display: "grid", gap: "16px" }}>
        {skills.map((group) => (
          <div
            key={group.category}
            style={{
              background: mantle,
              border: `1px solid ${surface}`,
              borderRadius: "12px",
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: "11px",
                color: red,
                marginBottom: "14px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {group.category}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "12px",
                    color: subtext,
                    background: surface,
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "default",
                    transition: "background 0.15s ease, color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.background =
                      theme === "dark"
                        ? "rgba(243,139,168,0.15)"
                        : "rgba(210,15,57,0.1)";
                    el.style.color = red;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.background = surface;
                    el.style.color = subtext;
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
