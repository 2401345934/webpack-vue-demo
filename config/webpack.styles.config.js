module.exports = [
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
