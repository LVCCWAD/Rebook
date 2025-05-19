import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react()
    ],

    server: {
        host: 'laravel.local',
        port: 5173,
        strictPort: true,
        cors: true,
        hmr: {
                host: 'laravel.local',
                protocol: 'ws',
                port: 5173,
            },
    },
});
