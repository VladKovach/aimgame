
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://vladkovach.github.io/aimgame/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 957, hash: 'c4832eff5b7891b874b01bfc4ac6274e4d6006950d0c3ee29019fa6f0a6e88e9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1053, hash: '4261f82c1b798d95cf36b9953644f87df46199b537fe041a5bf8fa0c72eb2a00', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-UQMYCOXW.css': {size: 1272, hash: 'nfv7KolCC5U', text: () => import('./assets-chunks/styles-UQMYCOXW_css.mjs').then(m => m.default)}
  },
};
