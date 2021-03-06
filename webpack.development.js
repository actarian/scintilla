const path = require('path');

const config = {
  environment: {
    MODE: 'development',
    APP_ID: '86c20074dd75415eaa828236b52c5416',
    CHANNEL_ID: 'channelId',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/scintilla/',
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
  devServer: {
    contentBase: [path.join(__dirname, 'assets')],
    contentBasePublicPath: ['/scintilla/'],
    host: '0.0.0.0',
    openPage: 'scintilla',
    port: 9000,
    publicPath: '/scintilla/',
  },
};

module.exports = config;
