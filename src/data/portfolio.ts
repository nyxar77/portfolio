// ============================================================
//  PORTFOLIO DATA — edit everything here, UI updates itself
// ============================================================

export const meta = {
  name: "nyxar_77",
  title: "Software Developer",
  tagline: "Building things that live in terminals and text editors.",
  bio: "I'm a developer who loves NixOS, Neovim, and clean config files. I spend most of my time tinkering with system configs, scripting automation, and occasionally shipping actual products.",
  github: "https://github.com/nyxar77",
  email: "", // fill in if you want
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

export interface Project {
  name: string;
  description: string;
  url: string;
  language: string;
  languageColor: string;
  stars: number;
  tags: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: "WebScrapper---Altissia",
    description:
      "A JavaScript web scraper targeting the Altissia language-learning platform — automates lesson navigation and answer extraction.",
    url: "https://github.com/nyxar77/WebScrapper---Altissia",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 1,
    tags: ["automation", "scraping", "javascript"],
    featured: true,
  },
  {
    name: "nixosconfig",
    description:
      "My personal NixOS configuration — declarative, reproducible, and obsessively organised. Covers home-manager, flakes, and system modules.",
    url: "https://github.com/nyxar77/nixosconfig",
    language: "Nix",
    languageColor: "#7e7eff",
    stars: 2,
    tags: ["nixos", "dotfiles", "linux", "flakes"],
    featured: true,
  },
  {
    name: "neovimconfig",
    description:
      "A fully Lua-based Neovim configuration. Lazy-loaded plugins, custom keymaps, LSP, Treesitter, and a clean aesthetic.",
    url: "https://github.com/nyxar77/neovimconfig",
    language: "Lua",
    languageColor: "#000080",
    stars: 1,
    tags: ["neovim", "lua", "editor", "dotfiles"],
    featured: true,
  },
];

export interface Skill {
  category: string;
  items: string[];
}

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["Lua", "JavaScript", "TypeScript", "Nix", "Bash", "Python"],
  },
  {
    category: "Tools & Editors",
    items: ["Neovim", "Git", "NixOS", "Home Manager", "tmux", "zsh"],
  },
  {
    category: "Frontend",
    items: ["React", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    category: "Systems & Infra",
    items: [
      "Linux",
      "NixOS",
      "Flakes",
      "Declarative config",
      "Shell scripting",
    ],
  },
];
