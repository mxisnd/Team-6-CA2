import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
export default defineConfig({
    plugins: [topLevelAwait()],
    base: './',
build: {
    rollupOptions: {
    input: {
        main: 'homepage.html', // Main entry point
        page1: 'customize', // Additional page 1
        page2: 'preorder.html', // Additional page 2
        },
    },
    },
});