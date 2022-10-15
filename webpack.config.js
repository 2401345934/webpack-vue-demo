const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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

const alias = {
  '@': path.resolve(__dirname, 'src')
}

const config = {
  entry: path.join(__dirname, 'src', 'main.ts'),
  devServer: {
    hot: true,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias
  },
  module: {
    rules: [
      { test: /\.pug$/, use: ['pug-plain-loader'] },
      { test: /\.vue$/, use: ['vue-loader'] },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.less$/,
        use: [
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
    cache: {
      type: 'filesystem'
    },
    optimization: {
      splitChunks: {
        // 设定引用次数超过 2 的模块才进行分包
        minChunks: 2
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
          parallel: 5 // number | boolean
        })
      ]
    }
  }
}

module.exports = function (e, v) {
  return {
    ...config,
    ...envConfig[v.mode]
  }
}
