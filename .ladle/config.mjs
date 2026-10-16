import path from "node:path";

/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "src/**/*.stories.{ts,tsx}",
  outDir: "reports/ladle",
  viteConfig: path.join(process.cwd(), ".ladle", "vite.config.mjs"),
};
