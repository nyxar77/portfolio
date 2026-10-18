#set page(
  paper: "a4",
  margin: (x: 1cm, y: 0.35cm)
)

#set text(
  font: "New Computer Modern",
  size: 10pt,
  lang: "fr"
)
#set par(leading: 0.5em)
#let accent = rgb("#204D5A")

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
  #text(size: 19pt, weight: "bold", fill: accent)[#upper("Abderrahmane Drissi")] \
  #v(1pt)
  #text(size: 11pt, weight: "semibold", fill: luma(30%))[Développement Full-Stack | Outils Linux] \
  #v(3pt)
  #text(size: 9.5pt)[
    #location-icon Salé, Maroc
    #h(8pt) | #h(8pt)
    #phone-icon #link("tel:+212635009061")[#underline[+212 635009061]]
    #h(8pt) | #h(8pt)
    #gmail-icon #link("mailto:abderrahmane.drissi@nyxar77.xyz")[#underline[abderrahmane.drissi\@nyxar77.xyz]]
  ] \
  #text(size: 8pt)[
    #github-icon #link("https://github.com/nyxar77")[#underline[https://github.com/nyxar77]]
    #h(5pt) | #h(5pt)
    #linkedin-icon #link("https://www.linkedin.com/in/abderrahmane-drissi-662607254")[#underline[https://www.linkedin.com/in/abderrahmane-drissi-662607254]]
    #h(5pt) | #h(5pt)
    #portfolio-icon #link("https://portfolio.nyxar77.xyz")[#underline[https://portfolio.nyxar77.xyz]]
  ]
  #v(3pt)
  #line(length: 100%, stroke: (paint: accent, thickness: 1pt))
]

// ── Helpers ────────────────────────────────────────────────────────────────

#let section(title) = {
  v(-1pt)
  text(size: 11.5pt, weight: "bold")[#upper(title)]
  v(-7pt)
  line(length: 100%, stroke: (paint: accent, thickness: 0.5pt))
  v(2pt)
}

#let entry(title, date, sub, body) = {
  grid(
    columns: (1fr, auto),
    text(weight: "bold")[#title], text(weight: "semibold")[#date]
  )
  if sub != "" {
    text(style: "italic", size: 9.5pt)[#sub]
    v(-4pt)
  }
  text(size: 9.5pt)[#body]
  v(0pt)
}

// ── Profil ─────────────────────────────────────────────────────────────────

#section("Profil")

#text(size: 10pt)[Élève ingénieur, je développe des applications full-stack et des outils Linux. Je travaille sur des backends Go, des interfaces React/Svelte et des configurations Nix déclaratives, avec une attention portée à l'automatisation et aux tests.]

// ── Éducation ──────────────────────────────────────────────────────────────

#section("Éducation")

#entry(
  "École Marocaine des Sciences de l'Ingénieur (EMSI)",
  "10/2025 – Présent",
  "Ingénierie Informatique et Réseaux – Rabat",
  []
)
#entry(
  "OFPPT",
  "09/2022 – 07/2024",
  "Technicien spécialisé en Développement Digital, option Web Full Stack",
  []
)

// ── Expérience ─────────────────────────────────────────────────────────────

#section("Expérience Professionnelle")

#entry(
  "Stagiaire en ingénierie logicielle – Nibiru Consulting",
  "08/2026 – 09/2026",
  "Rabat, Maroc",
  [
    - Conception et développement en Go de #link("https://github.com/Nibiru-Consulting/Eden")[#underline[Eden] #text(size: 8pt)[↗]], moteur JSON configurable en YAML ; un benchmark local de bout en bout atteint 53 867 messages/s avec une transformation.
    - Implémentation de la validation des graphes, du routage conditionnel, des transformations et de workers limités, avec contre-pression et arrêt coordonné ; 34 tests passent avec le détecteur de concurrence.
    - Ajout de 2 métriques Prometheus et d'endpoints de disponibilité ; mise en place d'un contrôle CI Nix pour le formatage, les tests, go vet, la compilation et les workflows.
  ]
)
#entry(
  "Stagiaire Développeur Full-Stack – ONEE",
  "03/2024 – 04/2024",
  "Fès, Maroc",
  [
    - Développement de #link("https://github.com/nyxar77/ParcAuto")[#underline[ParcAuto] #text(size: 8pt)[↗]], une application de gestion de flotte avec Laravel, React, Inertia.js et MySQL pour suivre les véhicules et les opérations.
    - Réalisation de la gestion des véhicules, de l'import/export, de l'historique et d'une interface de supervision.
  ]
)

// ── Compétences ────────────────────────────────────────────────────────────

#section("Compétences Techniques")

#grid(
  columns: (1.1fr, 0.9fr),
  gutter: 8pt,
  [
    *Langages :* Go, TypeScript/JavaScript, Bash, Lua, #box[C++] \
    *Backend :* Laravel, Django, SQL, MySQL, API REST
  ],
  [
    *Frontend :* Svelte, React, Capacitor, HTML/CSS \
    *DevOps/Observabilité :* NixOS, Home Manager, Git/GitHub Actions, Prometheus, Docker, Podman
  ]
)
#v(2pt)
#text(size: 10pt)[*Pratiques :* Linux/Bash, tests unitaires et d'intégration, automatisation, pipelines de données]

// ── Projets ────────────────────────────────────────────────────────────────

#section("Projets Majeurs")

#entry(
  [
    #link("https://github.com/nyxar77/Pulse")[#underline[Pulse – Planificateur d'Entraînement Hors Ligne] #text(size: 8pt)[↗]]
  ],
  "",
  "Stack : Svelte, TypeScript, Capacitor, Android",
  [
    - Projet solo : création et publication d'un planificateur hors ligne avec 72 exercices, cartes musculaires, suivi par série, sauvegardes JSON, versions Android et web installables, sans compte ni analytics.
  ]
)

#entry(
  [
    #link("https://github.com/nyxar77/homeconfig")[#underline[homeconfig – Configuration Linux Déclarative] #text(size: 8pt)[↗]]
  ],
  "",
  "Stack : Nix, Home Manager, Linux",
  [
    - Maintenance de 58 fichiers de modules Home Manager pour SSH, Podman, les outils de développement et le bureau, dans un flake avec 2 configurations Home Manager.
  ]
)

#entry(
  [
    #link("https://github.com/nyxar77/projectorctl")[#underline[projectorctl – Gestionnaire d'Affichage Hyprland] #text(size: 8pt)[↗]]
  ],
  "",
  "Stack : Shell, Nix, Hyprland, Quickshell",
  [
    - Projet solo : création d'un CLI, d'un panneau Quickshell et d'un module Home Manager pour 3 modes d'affichage (privé, miroir, étendu), avec bascule audio automatique et retour sécurisé si un écran disparaît ou si la vérification échoue.
  ]
)

// ── Langues ────────────────────────────────────────────────────────────────

#section("Langues")

#text(size: 10.5pt)[*Anglais :* Professionnel #h(16pt) *Arabe :* Maternel #h(16pt) *Français :* Intermédiaire]
