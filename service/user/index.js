const BaseService = require('../base');

module.exports = class UserService extends BaseService {
  constructor(Model) {
    const model = global.sequelize.models.User || Model;
    super(model);
  }
}