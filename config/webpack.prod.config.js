// 并行压缩
const TerserPlugin = require('terser-webpack-plugin')
// 压缩 html
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
module.exports = {
  devtool: 'eval',
  // cache: {
  //   type: 'filesystem'
  // },
  externals: {
    lodash: '_',
    dayjs: 'dayjs'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,
    minimizer: [
      '...',
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          // 折叠 Boolean 型属性
          collapseBooleanAttributes: true,
          // 使用精简 `doctype` 定义
          useShortDoctype: true
          // ...
        }
      }),
      new TerserPlugin({
        parallel: 5, // number | boolean
        exclude: ['node_modules']
      })
    ]
  }
}
