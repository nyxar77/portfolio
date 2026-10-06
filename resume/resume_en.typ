#set page(
  paper: "a4",
  margin: (x: 1cm, y: 0.7cm)
)

#set text(
  font: "New Computer Modern",
  size: 10.5pt,
  lang: "en"
)

// ── Icons ──────────────────────────────────────────────────────────────────

#let github-icon = box(
  height: 10pt,
  baseline: 2pt,
  image(
    bytes(```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
</svg>
    ```.text),
    format: "svg"
  )
)

#let linkedin-icon = box(
  height: 10pt,
  baseline: 2pt,
  image(
    bytes(```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
</svg>
    ```.text),
    format: "svg"
  )
)

#let gmail-icon = box(
  height: 10pt,
  baseline: 2pt,
  image(
    bytes(```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z"/>
</svg>
    ```.text),
    format: "svg"
  )
)

#let phone-icon = box(
  height: 10pt,
  baseline: 2pt,
  image(
    bytes(```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
</svg>
    ```.text),
    format: "svg"
  )
)

#let location-icon = box(
  height: 10pt,
  baseline: 2pt,
  image(
    bytes(```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
</svg>
    ```.text),
    format: "svg"
  )
)

#let portfolio-icon = box(
  height: 10pt,
  baseline: 2pt,
  image(
    bytes(```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 6h-3.02a15.24 15.24 0 0 0-1.13-3.04A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.88 3.96h-3.76A13.8 13.8 0 0 1 12 4.04zM4.26 14a8.23 8.23 0 0 1 0-4h3.42a16.83 16.83 0 0 0 0 4H4.26zm.81 2h3.02c.28 1.07.66 2.1 1.13 3.04A8.03 8.03 0 0 1 5.07 16zm3.02-8H5.07a8.03 8.03 0 0 1 4.15-3.04A15.24 15.24 0 0 0 8.09 8zM12 19.96A13.8 13.8 0 0 1 10.12 16h3.76A13.8 13.8 0 0 1 12 19.96zM14.3 14H9.7a14.3 14.3 0 0 1 0-4h4.6a14.3 14.3 0 0 1 0 4zm.48 5.04c.47-.94.85-1.97 1.13-3.04h3.02a8.03 8.03 0 0 1-4.15 3.04zM16.32 14a16.83 16.83 0 0 0 0-4h3.42a8.23 8.23 0 0 1 0 4h-3.42z"/>
</svg>
    ```.text),
    format: "svg"
  )
)

// ── Header ─────────────────────────────────────────────────────────────────

#align(center)[
  #text(size: 19pt, weight: "bold")[#upper("Abderrahmane Drissi")] \
  #v(1pt)
  #text(size: 11pt, weight: "semibold", fill: luma(30%))[Engineering Student] \
  #v(3pt)
  #text(size: 9.5pt)[
    #location-icon Salé, Morocco
    #h(8pt) | #h(8pt)
    #phone-icon #link("tel:+212635009061")[#underline[+212 635009061]]
    #h(8pt) | #h(8pt)
    #gmail-icon #link("mailto:abderrahmane.drissi@nyxar77.xyz")[#underline[abderrahmane.drissi\@nyxar77.xyz]]
    #h(8pt) | #h(8pt)
    #github-icon #link("https://github.com/nyxar77")[#underline[nyxar77]]
    #h(8pt) | #h(8pt)
    #linkedin-icon #link("https://www.linkedin.com/in/abderrahmane-drissi-662607254")[#underline[Abderrahmane Drissi]]
    #h(8pt) | #h(8pt)
    #portfolio-icon #link("https://portfolio.nyxar.space")[#underline[portfolio.nyxar.space]]
  ]
  #v(3pt)
  #line(length: 100%, stroke: 1pt)
]

// ── Helpers ────────────────────────────────────────────────────────────────

#let section(title) = {
  v(3pt)
  text(size: 11.5pt, weight: "bold")[#upper(title)]
  v(-7pt)
  line(length: 100%, stroke: 0.5pt)
  v(2pt)
}

#let entry(title, date, sub, body) = {
  grid(
    columns: (1fr, auto),
    text(weight: "bold")[#title], text(weight: "semibold")[#date]
  )
  if sub != "" {
    text(style: "italic", size: 9.5pt)[#sub]
  }
  v(-3pt)
  text(size: 10pt)[#body]
  v(0pt)
}

// ── Education ──────────────────────────────────────────────────────────────

#section("Education")

#entry(
  "Moroccan School of Engineering Sciences (EMSI)",
  "10/2025 -- Present",
  "Engineering Programme -- Rabat",
  []
)
#entry(
  "OFPPT - Digital Development",
  "09/2022 -- 07/2024",
  "Specialization: FullStack",
  []
)

// ── Experience ─────────────────────────────────────────────────────────────

#section("Professional Experience")

#entry(
  "Software Engineering Intern -- EMSI",
  "07/2026 -- 09/2026",
  "Rabat, Morocco",
  [
    - Designed and delivered Eden, Pulse, and Elene across Go, TypeScript, Svelte, Capacitor, Nix, automated testing, and CI.
  ]
)
#entry(
  "Frontend Developer -- CMH",
  "03/2025 -- 07/2025",
  "Tangier, Morocco",
  []
)
#entry(
  "Full-Stack Developer Intern -- ONEE",
  "03/2024 -- 04/2024",
  "Fès, Morocco",
  [
    - Developed #link("https://github.com/nyxar77/ParcAuto")[#underline[ParcAuto] #text(size: 8pt)[↗]], a vehicle fleet management system with Laravel, React, Inertia.js, and MySQL.
    - Implemented CRUD workflows, data import/export, operation history, and a reactive supervision interface.
  ]
)

// ── Skills ─────────────────────────────────────────────────────────────────

#section("Technical Skills")

#grid(
  columns: (1fr, 1fr),
  gutter: 8pt,
  [
    *Languages:* Go, TypeScript / JavaScript, Bash, Lua, C++ \
    *Backend:* Bun, Laravel, Django, MySQL, REST APIs
  ],
  [
    *Frontend:* Svelte, React, Capacitor, HTML / CSS \
    *Tools:* Nix / NixOS, Git, Docker, ADB, Neovim
  ]
)
#v(2pt)
#text(size: 10pt)[*Concepts:* Event Pipelines, Local-First Apps, Automation, Testing, CI/CD]

// ── Projects ───────────────────────────────────────────────────────────────

#section("Major Projects")

#entry(
  [
    #link("https://github.com/Nibiru-Consulting/Eden")[#underline[Eden -- Real-Time JSON Pipeline Engine] #text(size: 8pt)[↗]]
  ],
  "Go | YAML | Prometheus | Nix",
  "Data Pipeline Engine",
  [
    - Built a YAML-configured Go engine for validated real-time JSON pipelines with transformations, branching, bounded workers, Prometheus metrics, native modules, benchmarks, and Nix-backed CI.
  ]
)

#entry(
  [
    #link("https://github.com/nyxar77/Pulse")[#underline[Pulse -- Offline Workout Planner] #text(size: 8pt)[↗]]
  ],
  "Svelte | TypeScript | Capacitor | Android",
  "Local-First Mobile and Web App",
  [
    - Built and released an offline-first workout planner with 72 exercises, muscle maps, per-set tracking, JSON backups, installable Android and web builds, and no accounts or analytics.
  ]
)

#entry(
  [
    #link("https://github.com/nyxar77/Elene")[#underline[Elene -- Local Android Utility] #text(size: 8pt)[↗]]
  ],
  "Go | ADB | Nix",
  "Android Developer Tooling",
  [
    - Built an ADB CLI prototype for safe device detection and inspection, backed by Nix checks for formatting, static analysis, race-enabled tests, vulnerability audits, and CI.
  ]
)

// ── Languages ──────────────────────────────────────────────────────────────

#section("Languages")

#text(size: 10.5pt)[*English:* Professional #h(16pt) *Arabic:* Native #h(16pt) *French:* Fluent]
