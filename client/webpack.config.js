var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var historyFallback = require('connect-history-api-fallback');

module.exports = {
  plugins: [
    // BrowserSync setup
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['./'],
        middleware: [historyFallback()]
      }
    })
  ],
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    devtool: 'eval',
    inline: true
  }
};
