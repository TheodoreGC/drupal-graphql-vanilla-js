const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [
          { loader: 'graphql-persisted-document-loader' }, // <= Before graphql-tag/loader
          { loader: 'graphql-tag/loader' }
        ]
      }
    ]
  }
};
