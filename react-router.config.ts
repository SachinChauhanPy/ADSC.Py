import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: false,
  // Static-site generation is opt-in. By default this template builds as an
  // SPA (single index.html shell, client-side routing).
  buildDirectory: 'dist',
  // Feed Vite's dependency scanner the client entry + every route module.
  // Without it React Router hands Vite an EMPTY entry list, nothing is
  // pre-bundled, and each route's deps are discovered on that route's first
  // visit — which Vite answers with a full page reload, so preview links stop
  // behaving like SPA links. Dev-only: it never touches the production build.
  future: { unstable_optimizeDeps: true },
} satisfies Config;
