import { useState } from "react";
import { navItems, meta } from "@/data/portfolio";
import type { Section } from "@/data/portfolio";
import type { Theme } from "@/hooks/useTheme";

interface SidebarProps {
  active: Section;
  onNavigate: (s: Section) => void;
  theme: Theme;
  onThemeToggle: () => void;
}

export function Sidebar({
  active,
  onNavigate,
  theme,
  onThemeToggle,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(false);

  const bg = theme === "dark" ? "#181825" : "#e6e9ef";
  const border = theme === "dark" ? "#313244" : "#ccd0da";
  const red = theme === "dark" ? "#f38ba8" : "#d20f39";
  const subtext = theme === "dark" ? "#9399b2" : "#6c6f85";
  const textColor = theme === "dark" ? "#cdd6f4" : "#4c4f69";
  const hoverBg = theme === "dark" ? "#313244" : "#ccd0da";
  const activeBg =
    theme === "dark" ? "rgba(243,139,168,0.15)" : "rgba(210,15,57,0.10)";

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: expanded ? "200px" : "60px",
        background: bg,
        borderRight: `1px solid ${border}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.25s ease",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 14px",
            borderBottom: `1px solid ${border}`,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <img
            src={meta.avatar}
            alt={meta.name}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              flexShrink: 0,
              border: `2px solid ${red}`,
              objectFit: "cover",
            }}
          />
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "13px",
              fontWeight: 600,
              color: red,
              opacity: expanded ? 1 : 0,
              transition: "opacity 0.2s ease",
              overflow: "hidden",
            }}
          >
            {meta.name}
          </span>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "12px 8px",
          }}
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 10px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? activeBg : "transparent",
                  color: isActive ? red : subtext,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "100%",
                  textAlign: "left",
                  transition: "background 0.15s ease, color 0.15s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      hoverBg;
                    (e.currentTarget as HTMLButtonElement).style.color =
                      textColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      subtext;
                  }
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "3px",
                      height: "20px",
                      background: red,
                      borderRadius: "0 3px 3px 0",
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: "15px",
                    flexShrink: 0,
                    marginLeft: "2px",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: "Geist, Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    opacity: expanded ? 1 : 0,
                    transition: "opacity 0.15s ease",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "8px 8px 16px",
        }}
      >
        <button
          onClick={onThemeToggle}
          title="Toggle theme"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "transparent",
            color: subtext,
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
            textAlign: "left",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "15px",
              flexShrink: 0,
              marginLeft: "2px",
            }}
          >
            {theme === "dark" ? "☀" : "☾"}
          </span>
          <span
            style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: "13px",
              opacity: expanded ? 1 : 0,
              transition: "opacity 0.15s ease",
            }}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
        </button>

        <a
          href={meta.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 10px",
            borderRadius: "8px",
            color: subtext,
            textDecoration: "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "transparent";
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "15px",
              flexShrink: 0,
              marginLeft: "2px",
            }}
          >
            ⌥
          </span>
          <span
            style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: "13px",
              opacity: expanded ? 1 : 0,
              transition: "opacity 0.15s ease",
            }}
          >
            GitHub
          </span>
        </a>
      </div>
    </aside>
  );
}
