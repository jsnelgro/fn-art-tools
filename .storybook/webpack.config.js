const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$|\.md$/,
        use: 'raw-loader'
      }
    ]
  }
}