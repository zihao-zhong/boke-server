const UserService = require('../../service/user');
var bcrypt = require('bcryptjs');

module.exports = class UserController {
  constructor(app) {
    const { User } = app.context.sequelize.models;
    this.userService = new UserService(User);
  }

  // 获取用户信息列表接口
  async getUserList(ctx) {
    const data = await this.userService.list();
    ctx.success(data);
  }

  // 获取用户信息接口
  async getUserInfo(ctx) {
    const { id } = ctx.query;
    const data = await this.userService.getItemById(id);
    ctx.success(data);
  }

  // 用户登录接口
  async handleLogin(ctx) {
    const { username, password } = ctx.request.body;
    const user = await this.userService.getItem({ username });
    if (!user) throw new Error('用户不存在，请检查用户名');
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) throw new Error('密码错误');
    ctx.success(user);
  }

  // 新增用户，注册接口
  async createUser(ctx) {
    const data = ctx.request.body;
    const res = await this.userService.createItem(data);
    ctx.success(res);
  }

  // 删除用户接口，注销
  async deleteUser(ctx) {
    const { id } = ctx.query;
    await this.userService.deleteItem(id, '用户不存在');
    ctx.success('删除成功');
  }
}
