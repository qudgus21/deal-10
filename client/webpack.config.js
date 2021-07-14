const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./main.js', './styles/main.scss'],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: ['/node_modules'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devServer: {
    historyApiFallback: true,
  },
  optimization: { minimize: true },

  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'source-map',
};
