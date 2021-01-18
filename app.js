const Koa = require('koa');
const app = new Koa();

// const init = require('./middleware');
const json = require('koa-json');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
var bodyParser = require('koa-bodyparser');
const router = require('./routes/index');
const initConnectDB = require('./db/index');
const commonMethod = require('./core/commonMethod');


onerror(app);
// init(app);
initConnectDB(app);
commonMethod(app);

// app.use(require('koa-bodyparser')());
// app.use(json());
// app.use(logger());
app.use(koaBody());
app.use(bodyParser());

// app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app
  .use(router.routes())
  .use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


app.listen(5000, () => {
  console.log( 'http://localhost:5000' )
})
