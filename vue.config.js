module.exports = {
  publicPath: '',
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false,
    },
    externals: {
      lodash: '_',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      mdui: 'mdui',
      '@chenfengyuan/vue-qrcode': 'VueQrcode',
      codemirror: 'CodeMirror',
      he: 'he',
      terser: 'Terser',
    },
  },
};
