const Dotenv = require("dotenv-webpack")
const path = require("path")

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    port: 3000,
  },
  plugins: [new Dotenv({ path: path.resolve(__dirname, "..", ".env.dev") })],
}
