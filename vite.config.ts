import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react()]; // always include react plugin

  if (mode === "development") {
    // dynamically import lovable-tagger only in dev
    const { componentTagger } = await import("lovable-tagger");
    plugins.push(componentTagger() as any); // cast to `any` to satisfy TS
  }

  return {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["localhost", "127.0.0.1"],
      proxy: {
        "/api": {
          target: "http://localhost:3003",
          changeOrigin: true,
          secure: false,
        },
        "/socket.io": {
          target: "http://localhost:3003",
          ws: true,       // enable WebSocket proxying
          changeOrigin: true,
          secure: false,
        },
      },
    },

    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
