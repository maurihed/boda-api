const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const {
  NODE_ENV = 'production',
} = process.env;

console.log('NODE_ENV', NODE_ENV, process.env.NODE_ENV);

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd:{
        scripts: ['yarn run:dev'],
        blocking: false,
        parallel: true
      }
    })
  ],
  externals: [ nodeExternals() ]
}
