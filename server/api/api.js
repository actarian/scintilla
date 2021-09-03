const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, `../../docs/assets/api/api.json`);

const RoleType = {
  User: 'user',
};

let db = {
  views: [], menu: [], assets: [], users: [
    {
      id: '1',
      username: 'admin',
      password: 'admin',
      type: 'user',
    }, {
      id: '2',
      username: 'user',
      password: 'user',
      type: 'user',
    }
  ]
};

readStore();

function readStore() {
  fs.readFile(DB_PATH, 'utf8', (error, data) => {
    if (error) {
      console.log('NodeJs.Api.readStore.error', error, DB_PATH);
    } else {
      try {
        db = Object.assign(db, JSON.parse(data));
      } catch (error) {
        console.log('NodeJs.Api.readStore.error', error, DB_PATH);
      }
    }
  });
}

function saveStore() {
  const data = JSON.stringify(db, null, 2);
  fs.writeFile(DB_PATH, data, 'utf8', (error, data) => {
    if (error) {
      console.log('NodeJs.Api.saveStore.error', error, DB_PATH);
    }
  });
}

function sendError(response, status, message) {
  response.status(status).set('Content-Type', 'application/json').send(JSON.stringify({ status, message }));
}

function sendOk(response, data) {
  if (data) {
    response.status(200).set('Content-Type', 'application/json').send(JSON.stringify(data));
  } else {
    response.status(200).set('Content-Type', 'text/plain').send();
  }
}

function doCreate(request, response, params, items) {
  const body = request.body;
  const id = uuid();
  const item = Object.assign({}, body, { id });
  if (item.items) {
    item.items.forEach(x => x.id = uuid());
  }
  if (item.tiles) {
    item.tiles.forEach(x => x.id = uuid());
  }
  if (item.navs) {
    item.navs.forEach(x => x.id = uuid());
  }
  doSetLocale(item, params);
  items.push(item);
  saveStore();
  sendOk(response, item);
}

function doUpdate(request, response, params, items) {
  const body = request.body;
  const item = items.find(x => x.id === body.id);
  if (item) {
    Object.assign(item, body);
    doSetLocale(item, params);
    saveStore();
    sendOk(response, item);
  } else {
    sendError(response, 404, 'Not Found');
  }
}

function doDelete(request, response, params, items) {
  const index = items.reduce((p, x, i) => x.id === params.id ? i : p, -1);
  if (index !== -1) {
    // const item = items[index];
    items.splice(index, 1);
    saveStore();
    // sendOk(response, item);
    sendOk(response);
  } else {
    sendError(response, 404, 'Not Found');
  }
}

function doGet(request, response, params, items) {
  let item = items.find(x => x.id === params.id);
  if (!item) {
    sendError(response, 404, 'Not Found');
  }
  return item;
}

function doSetLocale(item, params) {
  const language = params.languageCode;
  if (language) {
    const localized = Object.assign({}, item);
    delete localized.locale;
    const locale = item.locale = (item.locale || {});
    locale[language] = localized;
    console.log('doSetLocale.languageCode', language);
  }
  return item;
}

function apiMiddleware(vars) {
  if (!vars.root) {
    throw new Error('missing Vars.root!');
  }
  if (!vars.baseHref) {
    throw new Error('missing Vars.baseHref!');
  }
  return (request, response, next) => {
    const url = request.baseUrl.replace(/\\/g, '/');
    const params = {};
    const method = ROUTES.find(route => {
      if (route.method.toLowerCase() === request.method.toLowerCase()) {
        const match = url.match(route.matcher);
        if (match) {
          route.segments.forEach((x, i) => {
            if (x.param) {
              let value = match[i + 1];
              if (parseInt(value).toString() === value) {
                value = parseInt(value);
              }
              params[x.param] = value;
            }
          });
          return true;
        }
      }
    });
    if (method) {
      console.log('apiMiddleware.url', url, method.path, method.method, params);
      method.callback(request, response, params);
    } else {
      next();
    }
  };
}

function setSessionUser(request, userType) {
  userType = userType || RoleType.SelfService;
  const id = uuid();
  const user = {
    id,
    type: userType,
    username: userType,
    password: '****',
    firstName: 'Jhon',
    lastName: 'Appleseed',
  };
  request.session.user = user;
}

function uuid() {
  // return new Date().getTime();
  return parseInt(process.hrtime.bigint().toString());
}

const ROUTES = [{
  path: '/api/view', method: 'GET', callback: function(request, response, params) {
    sendOk(response, { views: db.views });
  }
}];

ROUTES.forEach(route => {
  const segments = [];
  if (route.path === '**') {
    segments.push(route.path);
    route.matcher = new RegExp('^.*$');
  } else {
    const matchers = [`^`];
    const regExp = /(^\.\.\/|\.\/|\/\/|\/)|([^:|\/]+)\/?|\:([^\/]+)\/?/g;
    let relative;
    let match;
    while ((match = regExp.exec(route.path)) !== null) {
      const g1 = match[1];
      const g2 = match[2];
      const g3 = match[3];
      if (g1) {
        relative = !(g1 === '//' || g1 === '/');
      } else if (g2) {
        matchers.push(`\/(${g2})`);
        segments.push({ name: g2, param: null, value: null });
      } else if (g3) {
        matchers.push('\/([^\/]+)');
        const params = {};
        params[g3] = null;
        route.params = params;
        segments.push({ name: '', param: g3, value: null });
      }
    }
    matchers.push('$');
    const regexp = matchers.join('');
    console.log(regexp)
    route.matcher = new RegExp(regexp);
  }
  route.segments = segments;
})

module.exports = {
  apiMiddleware: apiMiddleware,
  uuid: uuid,
  RoleType: RoleType,
  setSessionUser: setSessionUser,
};
