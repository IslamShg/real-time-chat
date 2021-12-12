const Dotenv = require("dotenv-webpack")
const path = require("path")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    port: 3000,
    hot: true,
  },
  plugins: [
    new Dotenv({ path: path.resolve(__dirname, "..", ".env.dev") }),
    new ReactRefreshWebpackPlugin(),
  ],
}
