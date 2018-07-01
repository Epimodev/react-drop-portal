const path = require('path')

const projectRoot = path.resolve(__dirname, '../');

/**
 * We use ts-loader instead of awesome-typescript-loader
 * becase storybook is not compatible with last version of ts-loader
 */

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [
      'node_modules',
      projectRoot,
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ]
  },
};
