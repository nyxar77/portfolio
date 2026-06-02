export const meta = {
  name: "Abderrahmane Drissi",
  title: "Software developer. 1st-year engineering student at EMSI.",
  tagline: "I build web apps, automation scripts, and Linux tooling.",
  bio: "Currently a 1st-year engineering student at EMSI Rabat. I work mostly with React, Django, Laravel, Nix, and Linux.",
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
    repo: "videospeed-firefox",
    label: "Extension port",
    note: "Firefox browser tooling",
    fallbackDescription:
      "A Firefox port of the VideoSpeed extension for controlling video playback speed in the browser.",
  },
  {
    repo: "covoitEmsi",
    label: "Built app",
    note: "Campus commute product",
    fallbackDescription:
      "A carpooling app for EMSI students, built with ride posting, booking, and notifications.",
  },
  {
    repo: "bookStore",
    label: "Built app",
    note: "Bookstore application",
    fallbackDescription:
      "A bookstore app with book browsing and basic data management.",
  },
  {
    repo: "neovimconfig",
    label: "Daily tooling",
    note: "Editor workflow",
    fallbackDescription:
      "My Lua Neovim config with plugins, LSP, Treesitter, and keymaps.",
  },
  {
    repo: "nixosconfig",
    label: "Daily tooling",
    note: "Reproducible workstation",
    fallbackDescription:
      "My NixOS config for system modules, Home Manager, flakes, shell tools, and editor setup.",
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
