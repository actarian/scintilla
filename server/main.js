const https = require('https');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { staticMiddleware } = require('./static/static.js');
const { apiMiddleware, uuid } = require('./api/api.js');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: path.join(__dirname, '../docs/temp/') });
const BASE_HREF = '/scintilla/';
const ASSETS = `assets/`;
const ROOT = `../docs/`;
const PORT = process.env.PORT || 5000;
const PORT_HTTPS = 6443;

const Vars = {
  port: PORT,
  portHttps: PORT_HTTPS,
  host: `http://localhost:${PORT}`,
  hostHttps: `https://localhost:${PORT_HTTPS}`,
  charset: 'utf8',
  assets: ASSETS,
  baseHref: BASE_HREF,
  cacheMode: 'file',
  cache: path.join(__dirname, `../cache/`),
  root: ROOT,
  template: path.join(__dirname, `${ROOT}index.html`),
  accessControlAllowOrigin: true,
};

const staticMiddleware_ = staticMiddleware(Vars);
const apiMiddleware_ = apiMiddleware(Vars);

const app = express();
app.use(session({
  secret: 'scintilla-secret-keyword',
  saveUninitialized: true,
  resave: true
}));
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use('*', staticMiddleware_);
app.use('*', apiMiddleware_);

app.post('/api/upload', multipartMiddleware, function(request, response) {
  if (Vars.accessControlAllowOrigin) {
    response.header('Access-Control-Allow-Origin', '*');
  }
  console.log(request.body, request.files);
  const file = request.files.file;
  const id = uuid();
  const fileName = `${id}_${file.name}`;
  const folder = `/uploads/`;
  const input = file.path;
  const output = path.join(__dirname, Vars.root, folder, fileName);
  const upload = {
    id,
    fileName,
    type: file.type,
    originalFileName: file.name,
    url: `${folder}${fileName}`,
  };
  const uploads = [upload];
  fs.copyFile(input, output, (error) => {
    fs.unlink(input, () => { });
    if (error) {
      throw error;
    } else {
      response.status(200).send(JSON.stringify(uploads));
    }
  });
});
app.options('/api/upload', function(request, response) {
  console.log('OPTIONS');
  if (Vars.accessControlAllowOrigin) {
    response.header('Access-Control-Allow-Origin', '*');
  }
  response.status(200).send();
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../docs/index.html'));
});

app.listen(Vars.port, () => {
  console.log(`NodeJs Running server at ${Vars.host}`);
});

const heroku = (process.env._ && process.env._.indexOf('heroku'));
if (!heroku) {
  const privateKey = fs.readFileSync('certs/server.key', 'utf8');
  const certificate = fs.readFileSync('certs/server.crt', 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  const serverHttps = https.createServer(credentials, app);
  serverHttps.listen(Vars.portHttps, () => {
    console.log(`NodeJs Running server at ${Vars.hostHttps}`);
  });
}
