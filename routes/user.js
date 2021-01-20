
module.exports = function(app, router, instance) {
  const userController = instance(require('../controller/user'), app);

  router.get('/list', userController.getUserList);
  router.get('/', userController.getUserInfo);
  router.post('/register', userController.createUser);
  router.delete('/', userController.deleteUser);

  return router;
}
