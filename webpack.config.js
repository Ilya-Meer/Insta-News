module.exports = {
  entry: './js/script.js',
  output: {
    filename: './build/bundle.js'
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      // ...other loaders...
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
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            },

          }
        ]
      },
    ]
  }
};