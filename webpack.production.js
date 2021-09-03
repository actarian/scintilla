const path = require('path');

const config = {
  environment: {
    MODE: 'production',
    APP_ID: '86c20074dd75415eaa828236b52c5416',
    CHANNEL_ID: 'channelId',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  html: {
    template: './src/index.html',
    filename: 'index.html',
    title: 'Scintilla',
    description: 'Scintilla',
    image: 'https://actarian.github.io/scintilla/assets/img/logo.png',
    url: 'https://actarian.github.io/scintilla',
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  analyzer: true,
};

module.exports = config;
