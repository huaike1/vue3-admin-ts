module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  //构建项目申城目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devDist",
  //关闭自动检测
  lintOnSave: false,
  //css配置
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/styles/main.scss";',
      },
    },
  },
};
