
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://vladkovach.github.io/aimgame/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 957, hash: '02af45e903d23000680b97d8cc497b2943ea2c8d2df6f8cfe98aae81c66c6cb0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1053, hash: 'ae12bc585de7a77ebe90c1d17c45d36c6f88d5f7c8ac72051d60114a2aa36606', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-UQMYCOXW.css': {size: 1272, hash: 'nfv7KolCC5U', text: () => import('./assets-chunks/styles-UQMYCOXW_css.mjs').then(m => m.default)}
  },
};
