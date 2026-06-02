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
  "./dist/resume/Abderrahmane_Drissi_Resume_EN.pdf",
  Bun.file("./resume/Abderrahmane_Drissi_Resume_EN.pdf"),
);
await Bun.write(
  "./dist/resume/Abderrahmane_Drissi_CV_FR.pdf",
  Bun.file("./resume/Abderrahmane_Drissi_CV_FR.pdf"),
);

await Promise.allSettled([
  Bun.file("./dist/resume/resume-en.pdf").delete(),
  Bun.file("./dist/resume/resume-fr.pdf").delete(),
]);
