const UserService = require('../../service/user');

module.exports = class UserController {
  constructor() {
    // const { User } = global.sequelize.models;
    // this.userService = new UserService(User);
  }

  // 获取用户信息列表接口
  async getUserList(ctx) {
    try {
      const { User } = ctx.sequelize.models;
      const userService = new UserService(User);
      const data = await userService.list();
      ctx.success(data);
    } catch (e) {
      ctx.error(e);
    };
  }

  // 获取用户信息接口
  async getUserInfo(ctx) {
    try {
      const { id } = ctx.params;
      const { User } = ctx.sequelize.models;
      const userService = new UserService(User);
      const data = await userService.getItemById(id);
      ctx.success(data);
    } catch (e) {
      ctx.error(e);
    };
  }

  // 新增用户，注册接口
  async createUser(ctx) {
    try {
      const data = ctx.request.body;
      const { User } = ctx.sequelize.models;
      const userService = new UserService(User);
      const res = await userService.createItem(data);
      ctx.success(res);
    } catch (err) {
      ctx.error(err);
    };
  }

  // 删除用户接口，注销
  async deleteUser(ctx) {
    try {
      const { id } = ctx.query;
      const { User } = ctx.sequelize.models;
      const userService = new BaseService(User);
      await userService.deleteItem(id, '用户不存在');
      ctx.success('删除成功');
    } catch (err) {
      ctx.error(err);
    };
  }
}
