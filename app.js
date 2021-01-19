const Koa = require('koa');
const app = new Koa();

const json = require('koa-json');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser');

const initMiddleware = require('./middleware');
const router = require('./routes/index');
const initConnectDB = require('./db/index');
const commonMethod = require('./core/commonMethod');

async function start() {
  onerror(app);
  initConnectDB(app);
  initMiddleware(app);
  commonMethod(app);
  
  app.use(koaLogger());
  app.use(json());
  app.use(koaBody());
  app.use(bodyParser());

  // routes definition
  app
    .use(router.routes())
    .use(router.allowedMethods());
  
  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
  });
  
  
  app.listen(5000, () => {
    console.log('http://localhost:5000');
  })
}

(async () => {
  await start();
})();
