const path = require('path');

module.exports = {
  entry: ['./public/js/main.js', './public/styles/main.scss'],
  output: {
    path: path.resolve(__dirname, 'public/dist/js'),  
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'public/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  mode: 'development'
};