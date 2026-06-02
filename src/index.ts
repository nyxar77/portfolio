import { serve } from "bun";
import index from "./index.html";

const englishResume = "Abderrahmane_Drissi_Resume_EN.pdf";
const frenchResume = "Abderrahmane_Drissi_CV_FR.pdf";

const server = serve({
  port: Number(process.env.PORT ?? 3000),
  routes: {
    "/resume": req => {
      const language = req.headers.get("accept-language") ?? "";
      const useFrench = language.toLowerCase().startsWith("fr");
      const filename = useFrench ? frenchResume : englishResume;

      return new Response(Bun.file(`resume/${filename}`), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    },

    "/resume/en": () =>
      new Response(Bun.file(`resume/${englishResume}`), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${englishResume}"`,
        },
      }),

    "/resume/fr": () =>
      new Response(Bun.file(`resume/${frenchResume}`), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${frenchResume}"`,
        },
      }),

    [`/resume/${englishResume}`]: () =>
      new Response(Bun.file(`resume/${englishResume}`), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${englishResume}"`,
        },
      }),

    [`/resume/${frenchResume}`]: () =>
      new Response(Bun.file(`resume/${frenchResume}`), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${frenchResume}"`,
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
