const Router = require('@koa/router');
const router = new Router();
router.prefix('/api');

const UserController = require('../controller/user');
const userController = new UserController();

router.get('/user', userController.getUserList);
router.get('/user/:id', userController.getUserInfo);
router.post('/user', userController.createUser);
router.delete('/user', userController.deleteUser);

module.exports = router;
