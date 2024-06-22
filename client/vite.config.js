import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        manifest: true,
        rollupOptions: {
            input: "./src/main.jsx",
        },
    },
    server: {
        proxy: {
            "/api": "https://transactiviz-api.onrender.com",
            // "/api": "http://127.0.0.1:5000",
            cors: false
        },
    },
});
