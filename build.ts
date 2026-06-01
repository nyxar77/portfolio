import tailwind from "bun-plugin-tailwind";

await Bun.build({
  entrypoints: ["./src/index.html"],
  outdir: "./dist",
  sourcemap: "external",
  target: "browser",
  minify: true,
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  plugins: [tailwind],
});

await Bun.write(
  "./dist/resume/resume-en.pdf",
  Bun.file("./resume/resume-en.pdf"),
);
await Bun.write(
  "./dist/resume/resume-fr.pdf",
  Bun.file("./resume/resume-fr.pdf"),
);
