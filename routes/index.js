const fs = require('fs');
const path = require('path');
const instance = require('../utils/instance');
const Router = require('@koa/router');
const router = new Router();

module.exports = function(app) {
  const routers = fs.readdirSync(path.resolve(__dirname)).filter(i => i !== 'index.js');
  for (let i = 0; i < routers.length; i++) {
    const insetRouter = require(path.join(__dirname, routers[i]));
    const subRouter = insetRouter(app, router, instance);
    const ROUTER_PREFIX = routers[i].split('.')[0];
    // 注册子路由，统一前缀 /api , 文件名为子路由的前缀
    router.use(`/api/${ROUTER_PREFIX}`, subRouter.routes());
  }

  return router;
}
