const path = require("path");
const Timestamp = new Date().getTime();
const name = "EUISV";
const port = 80;
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
const devServer = {
  port: port,
};
if (process.env.VUE_APP_ENV === "development") {
  devServer.proxy = {
    "/euisbq": {
      target: `${process.env.VUE_APP_CAS_REDIRECT_URI} :${process.env.VUE_APP_APIPORT_EUISBQ}`,
      ws: true,
      changeOrigin: true,
      pathRewrite: { "^/euisbq": "" },
    },
    "/euisb": {
      target: `${process.env.VUE_APP_CAS_REDIRECT_URI} :${process.env.VUE_APP_APIPORT_EUISB}`,
      ws: true,
      changeOrigin: true,
      pathRewrite: { "^/euisb": "" },
    },
  };
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  transpileDependencies: ["vuetify"], // vuetify setting
  runtimeCompiler: true,
  parallel: true,
  productionSourceMap: false,
  configureWebpack: {
    name,
    output: {
      filename: `[name].js?v=${Timestamp}`,
      chunkFilename: `[name].js?v=${Timestamp}`,
    },
  },
  devServer,
  chainWebpack(config) {
    //設定 svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/assets/svg")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        limit: 2000,
        esModule: false,
      })
      .end();
    config.module
      .rule("pdf")
      .test(/l.pdf$/)
      .use("file-loader")
      .loader("file-loader");
  },
};
