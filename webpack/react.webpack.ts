import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

const rootPath = path.resolve(__dirname, "..");

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
  },
  entry: path.resolve(rootPath, "src/renderer", "index.tsx"),
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        include: /src/,
        use: {
          loader: "ts-loader",
        },
      },
      // css/
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(rootPath, "dist/renderer"),
      publicPath: "/",
    },
    port: 4000,
    historyApiFallback: true,
    compress: true,
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, "public/index.html"),
    }),
    // think about this
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(rootPath, "public/opus_pages/OPUS_NEWTAB.html"),
          to: path.resolve(rootPath, "dist/renderer"),
        },
        {
          from: path.resolve(rootPath, "public/opus_pages/style.css"),
          to: path.resolve(rootPath, "dist/renderer"),
        },
      ],
    }),
  ],
};

export default config;
