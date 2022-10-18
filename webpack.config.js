const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 并行压缩
const TerserPlugin = require('terser-webpack-plugin')
// fork 线程 check ts type
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// eslint 优化 plugins
const ESLintPlugin = require('eslint-webpack-plugin')
// 压缩 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 性能分析
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
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
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // type 属性适用于 Webpack5，旧版本可使用 file-loader
        exclude: /node_modules/,
        type: 'asset/resource',
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              // 只在生产环境开启
              disable: process.env.NODE_ENV === 'development',
              // jpeg 压缩配置
              mozjpeg: {
                quality: 80
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024
            }
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: ['raw-loader']
      },

      { test: /\.pug$/, use: ['thread-loader', 'pug-plain-loader'] },
      { test: /\.vue$/, use: ['thread-loader', 'vue-loader'] },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(process.cwd(), 'tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'thread-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // 添加 autoprefixer 插件
                plugins: [require('autoprefixer')]
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'thread-loader',
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // 添加 autoprefixer 插件
                plugins: [require('autoprefixer')]
              }
            }
          }
        ]
      }
    ]
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
    new HtmlWebpackPlugin({
      templateContent: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>alan Vue Webpack App</title>
  </head>
  <body>
    <div id="app" />
  </body>
</html>
    `
    })
    // new CompressionPlugin()
  ]
}

// 环境配置
const envConfig = {
  development: {
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
  },
  production: {
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
}

module.exports = function (e, v) {
  return merge(config, envConfig[v.mode])
}
