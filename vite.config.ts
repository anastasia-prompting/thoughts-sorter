import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Сайт публикуется на GitHub Pages по адресу
// https://<user>.github.io/thoughts-sorter/, поэтому для прод-сборки
// нужен базовый путь с именем репозитория. В dev-режиме остаётся "/".
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/thoughts-sorter/" : "/",
  plugins: [react()],
}));
