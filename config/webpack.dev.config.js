// 并行压缩
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  devtool: 'source-map',
  // 最小化监听
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true // 解决BrowserRouter路由跳转之后刷新浏览器按钮报404的情况
  },
  // // 按需编译
  // experiments: {
  //   lazyCompilation: true
  // },
  // 并行压缩
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
    minimizer: [
      new TerserPlugin({
        parallel: 2 // number | boolean
      })
    ]
  }
}
