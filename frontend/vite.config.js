// vite.config.js
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  plugins: [reactRefresh(), typescript()],
});
