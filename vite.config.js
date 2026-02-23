import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        devSourcemap: true, // Permite rastrear estilos hasta el archivo .scss original en el inspector
    },
});
