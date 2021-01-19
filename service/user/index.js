const BaseService = require('../base');

module.exports = class UserService extends BaseService {
  constructor(Model) {
    // const { User } = global.sequelize.models;
    super(Model);
  }
}