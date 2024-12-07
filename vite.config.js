import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/VirtualDropdown.jsx',  // Entry point for your component
      name: 'VirtualDropdownSelect',     // Global variable name in UMD build
      fileName: (format) => `virtualdropdown-select.${format}.js`, // Output file name
    },
    rollupOptions: {
      // Ensure that external libraries like React are not bundled into the package
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
