const path = require('path');

module.exports = {
  entry: './animacje.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'animacje.js',
  },
};
