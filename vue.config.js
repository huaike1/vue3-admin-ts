const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "./",
  //构建项目申城目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devDist",
  //关闭自动检测
  lintOnSave: false,
    //svg配置
  chainWebpack: config => {
    //svg配置
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.module
    .rule('svg-sprite-loader').test(/\.svg$/)
    .include
    .add(path.resolve('./src/assets/svg')) //处理svg目录
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
    symbolId: 'icon-[name]'
    });
  },
  //css配置
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/styles/main.scss";',
      },
    },
  },
  // 跨域配置
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8000,
    proxy: {
      [process.env.VUE_APP_FLAG]: {
        target: process.env.VUE_APP_APIURL,//目标地址
        ws: false,  
        changeOrigin: true,  //是否开启跨域
        pathRewrite: {
          [`^${process.env.VUE_APP_FLAG}`]: ''
        }
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
};
