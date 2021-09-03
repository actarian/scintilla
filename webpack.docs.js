const path = require('path');

const config = {
  environment: {
    MODE: 'production',
    APP_ID: '86c20074dd75415eaa828236b52c5416',
    CHANNEL_ID: 'channelId',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/scintilla/',
    filename: 'app/[name].[contenthash].js',
  },
  html: {
    template: './src/index.html',
    filename: 'index.html',
    title: 'Scintilla',
    description: 'A tribute to Scintilla magazine, amateurly printed in years 93-94.',
    image: 'https://actarian.github.io/scintilla/assets/img/logo.png',
    url: 'https://actarian.github.io/scintilla',
  },
  performance: {
    hints: 'warning', // enum
    maxAssetSize: 300000, // int (in bytes),
    maxEntrypointSize: 300000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  openAnalyzer: true,
};

module.exports = config;
