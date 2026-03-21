import { useEffect, useRef } from "react";
import { skills } from "@/data/portfolio";
import type { Theme } from "@/hooks/useTheme";

interface SkillsProps {
  theme: Theme;
}

const GLYPHS: Record<string, string> = {
  Languages: "λ",
  "Tools & Editors": "#",
  Frontend: "<>",
  "Systems & Infra": "$",
};

export function Skills({ theme }: SkillsProps) {
  const dark = theme === "dark";

  const red = dark ? "#f38ba8" : "#d20f39";
  const redGlow = dark ? "rgba(243,139,168,0.13)" : "rgba(210,15,57,0.18)";
  const redGlowStr = dark ? "rgba(243,139,168,0.22)" : "rgba(210,15,57,0.28)";
  const text = dark ? "#cdd6f4" : "#4c4f69";
  const subtext = dark ? "#9399b2" : "#6c6f85";
  const surface = dark ? "#313244" : "#ccd0da";
  const mantle = dark ? "#181825" : "#e6e9ef";

  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chipRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  // Card entrance animation
  useEffect(() => {
    groupRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      const t = setTimeout(
        () => {
          el.style.transition =
            "opacity 0.45s ease, transform 0.45s ease, border-color 0.25s, box-shadow 0.25s";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        },
        60 + i * 90,
      );
      return () => clearTimeout(t);
    });
  }, []);

  // Chip entrance animation
  useEffect(() => {
    chipRefs.current.forEach((group, gi) => {
      group.forEach((el, ii) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(4px) scale(0.96)";
        const t = setTimeout(
          () => {
            el.style.transition =
              "opacity 0.3s ease, transform 0.3s ease, color 0.15s, background 0.15s, border-color 0.15s, box-shadow 0.15s";
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
          },
          150 + gi * 80 + ii * 45,
        );
        return () => clearTimeout(t);
      });
    });
  }, []);

  return (
    <>
      <style>{`
        @keyframes skillsBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes skillsChipCaret {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .skills-cursor {
          animation: skillsBlink 1.1s step-end infinite;
        }
        .skills-chip .chip-pfx {
          max-width: 0;
          overflow: hidden;
          opacity: 0;
          margin-right: 0;
          transition: max-width 0.15s ease, opacity 0.15s ease, margin-right 0.15s ease;
          white-space: nowrap;
          font-size: 15px;
        }
        .skills-chip:hover .chip-pfx {
          max-width: 20px;
          opacity: 1;
          margin-right: 2px;
        }
        .skills-chip .chip-caret {
          font-size: 10px;
          margin-left: 2px;
          opacity: 0;
        }
        .skills-chip:hover .chip-caret {
          opacity: 1;
        }
        .skills-group::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent, transparent 3px,
            rgba(127,127,127,0.025) 3px, rgba(127,127,127,0.025) 4px
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s;
          z-index: 0;
          border-radius: 10px;
        }
        .skills-group:hover::before { opacity: 1; }
        .skills-group::after {
          content: '';
          position: absolute;
          bottom: -30px; right: -30px;
          width: 100px; height: 100px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
      `}</style>

      <section
        style={{ minHeight: "100vh", padding: "80px 60px", maxWidth: "760px" }}
      >
        {/* Prompt line */}
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "13px",
            color: subtext,
            marginBottom: "12px",
          }}
        >
          <span style={{ color: red, textShadow: `0 0 8px ${redGlowStr}` }}>
            ~/
          </span>{" "}
          cat skills.json
        </p>

        {/* Heading */}
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
          Skills
          <span
            className="skills-cursor"
            style={{ color: red, textShadow: `0 0 14px ${redGlowStr}` }}
          >
            _
          </span>
        </h2>

        {/* Skill groups */}
        <div style={{ display: "grid", gap: "10px" }}>
          {skills.map((group, gi) => {
            if (!chipRefs.current[gi]) chipRefs.current[gi] = [];
            const glyph = GLYPHS[group.category] ?? ">";

            return (
              <div
                key={group.category}
                className="skills-group"
                ref={(el) => {
                  groupRefs.current[gi] = el;
                }}
                style={{
                  background: mantle,
                  border: `1px solid ${surface}`,
                  borderRadius: "10px",
                  padding: "18px 20px 16px",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = red;
                  el.style.boxShadow = `0 0 0 1px ${redGlow}, 0 4px 24px ${redGlow}, inset 0 0 32px ${redGlow}`;
                  const after =
                    el.querySelector<HTMLElement>(".skills-group-glow");
                  if (after) after.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = surface;
                  el.style.boxShadow = "none";
                  const after =
                    el.querySelector<HTMLElement>(".skills-group-glow");
                  if (after) after.style.opacity = "0";
                }}
              >
                {/* Corner ambient glow element */}
                <div
                  className="skills-group-glow"
                  style={{
                    position: "absolute",
                    bottom: -30,
                    right: -30,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${redGlowStr}, transparent 70%)`,
                    pointerEvents: "none",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    zIndex: 0,
                  }}
                />

                {/* Category header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "13px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: "11px",
                      color: red,
                      opacity: 0.75,
                    }}
                  >
                    {glyph}
                  </span>
                  <span
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: "10px",
                      color: red,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {group.category}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: `linear-gradient(to right, ${surface}, transparent)`,
                    }}
                  />
                </div>

                {/* Chips */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {group.items.map((item, ii) => (
                    <span
                      key={item}
                      className="skills-chip"
                      ref={(el) => {
                        chipRefs.current[gi][ii] = el;
                      }}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: "11px",
                        color: subtext,
                        background: surface,
                        border: "1px solid transparent",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "default",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.color = text;
                        el.style.background = "transparent";
                        el.style.borderColor = red;
                        el.style.boxShadow = `0 0 8px ${redGlowStr}, inset 0 0 6px ${redGlow}`;
                        el.style.textShadow = `0 0 6px ${redGlowStr}`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.color = subtext;
                        el.style.background = surface;
                        el.style.borderColor = "transparent";
                        el.style.boxShadow = "none";
                        el.style.textShadow = "none";
                      }}
                    >
                      <span
                        className="chip-pfx"
                        style={{
                          color: red,
                          fontFamily: '"JetBrains Mono", monospace',
                        }}
                      >
                        &gt;_
                      </span>
                      {item}
                      <span
                        className="chip-caret"
                        style={{
                          color: red,
                          fontFamily: '"JetBrains Mono", monospace',
                        }}
                      >
                        ▌
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
