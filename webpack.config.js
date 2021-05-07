const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = () => {
  let config = {
    entry: {
        bundle: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name][chunkhash].js",
    },
    devServer: {
      contentBase: path.resolve(__dirname, "public"),
      port: 5000,
      hot: true,
    },
    module: {
      rules: [
        {
        test: /\.[jt]sx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react",],
              plugins: [
                // ... other plugins
                 require.resolve('react-refresh/babel'),
              ]
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            "style-loader",
            "css-loader",
            {
                loader: "less-loader",
                options: {
                    lessOptions:{
                        modifyvars:{
                            'primary-color': '#FFFFFF'
                        }
                    }
                }
            }
          ],
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                    limit: 60000
                }
              },
              'image-webpack-loader'
            ],
        }
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      
    ],

  };
  return config;
};
