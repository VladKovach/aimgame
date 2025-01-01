
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/aimgame/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 929, hash: '0fb5667e6959c3d2197825e72bf0f0db2d50c94d8f6b4bbe4ca8b4ec5f3731f9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1025, hash: '8f7f0b5d77e48330513716567f408441e7eba89d071b7352cbddd7f2c2442b27', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-UQMYCOXW.css': {size: 1272, hash: 'nfv7KolCC5U', text: () => import('./assets-chunks/styles-UQMYCOXW_css.mjs').then(m => m.default)}
  },
};
