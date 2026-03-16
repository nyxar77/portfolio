import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { useTheme } from "./hooks/useTheme";
import type { Section } from "./data/portfolio";

export default function App() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState<Section>("about");

  const bg = theme === "dark" ? "#1e1e2e" : "#eff1f5";

  const renderSection = () => {
    switch (active) {
      case "about":
        return <About theme={theme} />;
      case "projects":
        return <Projects theme={theme} />;
      case "skills":
        return <Skills theme={theme} />;
      case "contact":
        return <Contact theme={theme} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        display: "flex",
        transition: "background 0.3s ease",
      }}
    >
      <Sidebar
        active={active}
        onNavigate={setActive}
        theme={theme}
        onThemeToggle={toggle}
      />
      {/* offset by collapsed sidebar width (60px) */}
      <main style={{ flex: 1, paddingLeft: "60px" }}>{renderSection()}</main>
    </div>
  );
}
