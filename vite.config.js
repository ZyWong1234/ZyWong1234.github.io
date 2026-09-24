import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// package.json sets "type": "module", so this config is ESM and __dirname
// does not exist here. Resolve against import.meta.url instead.
const here = (p) => fileURLToPath(new URL(p, import.meta.url));

// Multi-page setup: every HTML entry point has to be listed, otherwise Vite
// only builds index.html and the project pages 404 in production.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: here('index.html'),
        moonAndBloom: here('projects/moon-and-bloom.html'),
        superMathsBros: here('projects/super-maths-bros.html'),
        hypertextEdu: here('projects/hypertext-edu.html'),
        psychologySystem: here('projects/psychology-system.html'),
        assessmentFeedback: here('projects/assessment-feedback-system.html'),
        enterpriseNetwork: here('projects/enterprise-network.html'),
        eduSphere: here('projects/edusphere.html'),
      },
    },
  },
});
