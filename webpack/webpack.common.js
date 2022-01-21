const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  output: {
    filename: '[fullhash].bundle.js',
    path: path.resolve(__dirname, '..', './build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html')
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'dest' }]
    })
  ]
}
