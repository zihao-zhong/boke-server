module.exports = async function(app) {
  const Router = require('@koa/router');
  const router = new Router();
  router.prefix('/api');
  const instance = require('../utils/instance');
  const UserController = require('../controller/user');
  const userController = instance(UserController, app);

  router.get('/user', userController.getUserList);
  router.get('/user/:id', userController.getUserInfo);
  router.post('/user', userController.createUser);
  router.delete('/user', userController.deleteUser);

  return router;
}
