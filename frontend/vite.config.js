import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import eslint from '@rollup/plugin-eslint';

export default defineConfig({
    plugins: [
        react(),
        checker({ typescript: true }),
        eslint({ include: ["./src/**/*.ts", "./src/**/*.tsx"] }),
    ],
});
