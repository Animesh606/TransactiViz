import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// export default defineConfig({
//     plugins: [react()],
//     build: {
//         manifest: true,
//         rollupOptions: {
//             input: "./src/main.jsx",
//         },
//         outDir: "dist"
//     },
//     server: {
//         proxy: {
//             "/api": import.meta.env.VITE_API_KEY,
//             cors: false
//         },
//     },
// });

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const API_URL = `${env.VITE_API_URL ?? "http://localhost:5000"}`;

    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": API_URL,
            },
            cors: false
        },
        build: {
            outDir: "dist",
        },
    };
});
