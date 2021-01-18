const Router = require('@koa/router');
const router = new Router();
router.prefix('/api');
const BaseService = require('../service/base');

// const UserService = require('../service/user');
// const Service = new UserService();

router.get('/user', async (ctx) => {
  try {
    const { User } = ctx.sequelize.models;
    const service = new BaseService(User);
    const data = await service.list();
    ctx.success(data);
  } catch (e) {
    ctx.error(e);
  }
});

router.post('/user', async (ctx) => {
  try {
    const data = ctx.request.body;
    const { User } = ctx.sequelize.models;
    const service = new BaseService(User);
    const res = await service.createItem(data);
    ctx.success(res);
  } catch (err) {
    ctx.error(err);
  };
});

router.delete('/user', async (ctx) => {
  try {
    const { id } = ctx.query;
    const { User } = ctx.sequelize.models;
    const service = new BaseService(User);
    await service.deleteItem(id, '用户不存在');
    ctx.success('删除成功');
  } catch (err) {
    ctx.error(err);
  };
});

module.exports = router;
