import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: ".", // index.html en la raíz
  publicDir: "assets", // copia /assets → /dist/assets
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [tsconfigPaths()],
});
