const Dotenv = require('dotenv-webpack')
const path = require('path')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new Dotenv({ path: path.resolve(__dirname, '..', '.env.prod') }),
    new BundleAnalyzerPlugin()
  ]
}
