const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const development = require('./config/webpack.dev.config')
const production = require('./config/webpack.prod.config')
const images = require('./config/webpack.image.config')
const scripts = require('./config/webpack.script.config')
const styles = require('./config/webpack.styles.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// fork 线程 check ts type
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// eslint 优化 plugins
const ESLintPlugin = require('eslint-webpack-plugin')
// 压缩 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 性能分析
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
const { AntDesignVueResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
// 压缩
// const CompressionPlugin = require('compression-webpack-plugin')
// build 前 清理 dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 合并配置
const { merge } = require('webpack-merge')

const alias = {
  '@': path.resolve(__dirname, 'src')
}

const config = {
  entry: path.join(__dirname, 'src', 'main.ts'),
  output: {
    filename: '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    alias
  },
  module: {
    rules: [...images, ...scripts, ...styles]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    // eslint plugin
    new ESLintPlugin(),
    new MiniCssExtractPlugin(),
    new StatoscopeWebpackPlugin(),
    new VueLoaderPlugin(),
    ComponentsPlugin({
      resolvers: [AntDesignVueResolver()]
    }),
    // htmlWebpackPlugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'head'
    })
    // new CompressionPlugin()
  ]
}

// 环境配置
const envConfig = {
  development,
  production
}

module.exports = function (e, v) {
  return merge(config, envConfig[v.mode])
}
