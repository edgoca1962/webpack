'use strict';

const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   mode: "development",
   entry: {
      main: "./src/source.js",
   },
   output: {
      path: path.resolve(__dirname, "../themes/sgf/assets/"),
      filename: "[name].js",
   },
   module: {
      rules: [
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(s[ac]|c)ss$/i,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               "postcss-loader",
               "sass-loader",
            ],
         },
      ],
   },
   plugins: [
      new BrowserSyncPlugin({
         host: "localhost",
         port: 3000,
         proxy: "http://sgf.local/",
         files: ["../themes/**/*.php"],
         reload: false,
      }),
      new MiniCssExtractPlugin({
         filename: "[name].css",
      }),
   ],
};
