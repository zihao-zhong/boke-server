const Koa = require('koa');
const app = new Koa();

const json = require('koa-json');
const koaBody = require('koa-body');
const onerror = require('koa-onerror');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const initConnectDB = require('./db/index');
const initRouter = require('./routes/index');
const initMiddleware = require('./middleware');
const commonMethod = require('./core/commonMethod');

async function start() {
  onerror(app);
  commonMethod(app);
  initMiddleware(app);
  await initConnectDB(app);
  const router = initRouter(app);
  
  app.use(json());
  app.use(koaBody());
  app.use(koaLogger());
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  
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
