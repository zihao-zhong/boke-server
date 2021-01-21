
module.exports = function(app, router, instance) {
  const userController = instance(require('../controller/user'), app);

  router.get('/list', userController.getUserList);
  router.get('/', userController.getUserInfo);
  router.delete('/', userController.deleteUser);
  router.post('/login', userController.handleLogin)
  router.post('/register', userController.createUser);

  return router;
}
