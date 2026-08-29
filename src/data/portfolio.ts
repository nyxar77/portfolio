export const meta = {
  name: "Abderrahmane Drissi",
  title: "Software developer focused on web apps, Linux tooling, and automation.",
  tagline: "I build web apps, automation scripts, and Linux tooling.",
  bio: "I build practical software for the web, Android, and Linux, with a focus on local-first apps, automation, and tools that fit into existing workflows.",
  github: "https://github.com/nyxar77",
  email: "dev@nyxar.space",
  location: "Morocco",
  avatar: "https://avatars.githubusercontent.com/u/153492661?v=4",
};

export type Section = "about" | "projects" | "skills" | "contact";

export const navItems: { id: Section; label: string; icon: string }[] = [
  { id: "about", label: "About", icon: "◈" },
  { id: "projects", label: "Projects", icon: "◇" },
  { id: "skills", label: "Skills", icon: "◆" },
  { id: "contact", label: "Contact", icon: "◉" },
];

export interface RepoSpotlight {
  repo: string;
  label: string;
  note: string;
  fallbackDescription: string;
}

export const repoSpotlights: RepoSpotlight[] = [
  {
    repo: "Pulse",
    label: "Product app",
    note: "Offline workout planner",
    fallbackDescription:
      "A local-first workout planner for Android and the web, with offline data, exercise tracking, and JSON programme import/export.",
  },
  {
    repo: "projectorctl",
    label: "Linux tooling",
    note: "Hyprland display switcher",
    fallbackDescription:
      "A display switcher for Hyprland laptops with a CLI, Quickshell panel, projector layouts, Nix integration, and unplug recovery.",
  },
  {
    repo: "caelestia-extras",
    label: "Open source",
    note: "Linux desktop integrations",
    fallbackDescription:
      "A Go tool that keeps cursor, GTK, Qt, portals, and other desktop integrations in sync with Caelestia themes.",
  },
  {
    repo: "homeconfig",
    label: "Infrastructure",
    note: "Home Manager workstation",
    fallbackDescription:
      "A Home Manager configuration for Hyprland, Caelestia, and a reproducible Linux desktop environment.",
  },
  {
    repo: "Elene",
    label: "Desktop utility",
    note: "Local Android package manager",
    fallbackDescription:
      "A local Android application installer and updater built around ADB, with a Nix development environment and documented checks.",
  },
  {
    repo: "videospeed-firefox",
    label: "Browser tooling",
    note: "Firefox extension port",
    fallbackDescription:
      "A Firefox-compatible port of Video Speed Controller for controlling HTML5 video playback with keyboard shortcuts.",
  },
];

export interface Skill {
  category: string;
  items: string[];
}

export const skills: Skill[] = [
  {
    category: "Build",
    items: ["TypeScript", "React", "JavaScript", "HTML", "CSS", "Python"],
  },
  {
    category: "Automate",
    items: ["Bash", "Shell scripting", "Web scraping", "Git", "Linux"],
  },
  {
    category: "Configure",
    items: ["Nix", "NixOS", "Nixpkgs", "Home Manager", "Flakes", "tmux"],
  },
  {
    category: "Work",
    items: ["Neovim", "Lua", "Go", "Java", "Open source", "Declarative config"],
  },
];
