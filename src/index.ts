import { serve } from "bun";
import index from "./index.html";

const server = serve({
  port: Number(process.env.PORT ?? 3000),
  routes: {
    "/resume": req => {
      const language = req.headers.get("accept-language") ?? "";
      const useFrench = language.toLowerCase().startsWith("fr");
      const file = useFrench ? "resume/resume-fr.pdf" : "resume/resume-en.pdf";
      const filename = useFrench
        ? "abderrahmane-drissi-resume-fr.pdf"
        : "abderrahmane-drissi-resume-en.pdf";

      return new Response(Bun.file(file), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    },

    "/resume/en": () =>
      new Response(Bun.file("resume/resume-en.pdf"), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="abderrahmane-drissi-resume-en.pdf"',
        },
      }),

    "/resume/fr": () =>
      new Response(Bun.file("resume/resume-fr.pdf"), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="abderrahmane-drissi-resume-fr.pdf"',
        },
      }),

    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
