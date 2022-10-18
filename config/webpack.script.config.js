const path = require('path')
module.exports = [
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
  }
]
