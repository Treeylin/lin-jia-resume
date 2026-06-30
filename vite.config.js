import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/lin-jia-resume/",
  plugins: [react()],
  preview: {
    allowedHosts: ["product-worthy-animation-cleaner.trycloudflare.com"],
  },
});
