const Router = require('@koa/router');
const router = new Router();
router.prefix('/api')
const moment = require('moment');

router.get('/user', async (ctx) => {
  try {
    const { User } = ctx.sequelize.models;
    const data = await User.findAll();
    ctx.success(data);
  } catch (e) {
    ctx.error(e);
  }
});

router.post('/user', async (ctx) => {
  try {
    const { User } = ctx.sequelize.models;
    const data = ctx.request.body;
    const res = await User.create({
      ...data,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
    ctx.success(res);
  } catch (err) {
    ctx.error(err);
  };
});

router.delete('/user', async (ctx) => {
  try {
    const { User } = ctx.sequelize.models;
    const { id } = ctx.query;
    const user = await User.findOne({
      where: { id },
    })
    if (!user) throw new Error('用户不存在');
    await user.destroy();
    ctx.success('删除成功');
  } catch (err) {
    ctx.error(err);
  };
});

module.exports = router;
