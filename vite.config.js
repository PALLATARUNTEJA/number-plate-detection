import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic', // Ensures proper JSX handling
    babel: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', {
          runtime: 'automatic',
          importSource: 'react'
        }]
      ]
    }
  })],
  base: '/number-plate-detection/',
  server: {
    headers: {
      'Content-Type': 'application/javascript' // Fixes MIME type error
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/results': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, './index.html'), // Absolute path for reliability
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['axios', 'react-icons']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Fixes path resolution
      '~assets': path.resolve(__dirname, './src/assets')
    },
    extensions: ['.js', '.jsx', '.json'] // Explicit extensions
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});






//   import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/number-plate-detection/',
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   },
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       input: {
//         main: './index.html'
//       }
//     }
//   }
// })







// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   base: '/number-plate-detection/',
//   plugins: [react()],
// })
