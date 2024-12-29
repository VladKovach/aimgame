
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/aimgame/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 929, hash: '539a772a64232183f6e561f4ce34af38b33ae9338c0a0a4ca6d8f181a6b8e3dc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1025, hash: '5b55f4c004ce2d0e5a3da9c90910e6c273cced4325da37f6797902d976640da1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-OZPNVHW3.css': {size: 1309, hash: 'd6VXmdG6WLY', text: () => import('./assets-chunks/styles-OZPNVHW3_css.mjs').then(m => m.default)}
  },
};
