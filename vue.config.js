const path = require('path')
const Timestamp = new Date().getTime()

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  transpileDependencies: ['vuetify'], // vuetify setting
  runtimeCompiler: true,
  parallel: true,
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: `[name].js?v=${Timestamp}`,
      chunkFilename: `[name].js?v=${Timestamp}`
    }
  },
  chainWebpack(config) {
    // 設定 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/svg')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
        limit: 2000,
        esModule: false
      })
      .end()
    config.module
      .rule('pdf')
      .test(/l.pdf$/)
      .use('file-loader')
      .loader('file-loader')
  }
}
