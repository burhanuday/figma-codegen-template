const path = require("path");

const webpack = require("webpack");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: prod ? "production" : "development",

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: prod ? false : "inline-source-map",

  entry: {
    code: "./src/index.ts", // The entry point for plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"), // Compile into a folder called "dist"
    clean: true,
    publicPath: "/",
  },

  plugins: [
    new webpack.DefinePlugin({
      global: {}, // Fix missing symbol error when running in developer VM
    }),
  ],

  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, `./node_modules/.cache/webpack`),
  },
};
