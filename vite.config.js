import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig(({ mode }) => {
  // Load env variables from the actual project root
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: "src/",
    publicDir: "../public",
    
    server: {
      host: "localhost",
      port: 3000,
      open: true,
    },
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
        },
      },
    },
    define: {
      "import.meta.env.VITE_EXERCISEDB_API_KEY": JSON.stringify(
        env.VITE_EXERCISEDB_API_KEY,
      ),
    },
  };
});
