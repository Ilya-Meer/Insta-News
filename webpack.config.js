module.exports = {
  entry: './js/script.js',
  output: {
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file?name=assets/fonts/[name].[ext]'
        }]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
    ]
  }
};