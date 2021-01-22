
module.exports = class BaseService {
  constructor(Model) {
    this.Model = Model;
  }

  /**
   * @author zihao
   * @param {*} options 
   * @description 通用的查询方法，如果业务本身较为复杂，可以自己写
   */
  async list(options = { where: {}, pageNum: 1, pageSize: 10, order: 'updatedAt,desc', include: [] }) {
    options.limit = parseInt(options.pageSize, 10);
    options.offset = parseInt(options.pageSize, 10) * (parseInt(options.pageNum, 10) - 1);
    options.order = [options.order.split(';').map(i => i.split(','))];
    delete options.pageNum;
    delete options.pageSize;

    return await this.Model.findAll(options);
  }

  /**
   * @author zihao
   * @param {*} options 
   * @description 获取总数及数据的方法
   * @description 约定, count 字段作为总数, data 字段做承载数据
   */
  async listAndCount(options = { where: {}, pageNum: 1, pageSize: 10, order: 'updatedAt,desc', include: [] }) {
    options.limit = parseInt(options.pageSize, 10);
    options.offset = parseInt(options.pageSize, 10) * (parseInt(options.pageNum, 10) - 1);
    options.order = [options.order.split(';').map(i => i.split(','))];
    delete options.pageNum;
    delete options.pageSize;
    const ret = await this.Model.findAndCountAll(options);
    return {
      count: ret.count,
      data: ret.rows,
    };
  }

  /**
   * @author zihao
   * @param {*} where 
   * @description 获取总数的方法
   */
  async count(where = {}) {
    return await this.Model.count({ where });
  }

  /**
   * @author zihao
   * @param {*} where 
   * @description 获取单个数据的方法
   */
  async getItem(where = {}) {
    return await this.Model.findOne({ where });
  }

  /**
   * @author zihao
   * @param {*} where 
   * @description 获取单个数据的方法
   */
  async getItemById(id) {
    return await this.Model.findByPk(id);
  }

  /**
   * @author zihao
   * @param {*} data 
   * @description 新增单个数据的方法
   */
  async createItem(data) {
    const ret = await this.Model.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return ret;
  }

  /**
   * @author zihao
   * @param {*} data 要修改的数据
   * @param {*} where 是否内部去查询数据是否存在，如果不需要请传 false
   * @param {*} whereTwo 如果调用 Model 的 update 方法，需要传如的条件 
   * @description 修改单个数据的方法
   */
  async updateItem(data, where = false, whereTwo = {}) {
    if (where) {
      const item = await this.getItem(where);
      if (!item) throw new Error('数据不存在');
      const ret = await item.update({
        ...data,
        updatedAt: new Date(),
      });
      return ret;
    } else {
      return await this.Model.update({
        ...data,
        updatedAt: new Date(),
      }, whereTwo);
    }
  }

  /**
   * @author zihao
   * @param {*} data 
   * @description 删除单个数据的方法
   */
  async deleteItem(id, errMsg = '数据不存在') {
    const item = await this.getItem({ id });
    if (!item) throw new Error(errMsg);

    await item.destroy();
  }

  /**
   * @author zihao
   * @param {*} where 
   * @description 删除数据的方法
   */
  async destroy(where) {
    return await this.Model.destroy({ where });
  }

  /**
   * @author zihao
   * @param {*} sql 语句 
   * @param {*} options 配置 
   * @description 原生的sql语句查询
   */
  async query(sql, options = {}) {
    return await global.sequelize.query(sql, options);
  }
};
