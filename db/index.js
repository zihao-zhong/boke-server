const config = require('../config');
const { Sequelize } = require('sequelize');
const initModels = require('./models/index');

module.exports = async function initConnectDB(app) {
  const sequelize = new Sequelize('boke', 'root', '1095996920', {
    host: config.host,
    prot: config.prot,
    dialect: config.dialect,
    logging: true,  // 打印 sql 语句
    pool: {   //连接池设置
      max: 5, //最大连接数
      min: 0, //最小连接数
      idle: 10000
    },
  });

  sequelize.authenticate().then(() => {
    // 注册模型
    initModels(sequelize);
    global.sequelize = sequelize;
    app.context.sequelize = sequelize;
    // sequelize.sync({ force: false });
    console.log('Connection db successfully.');
  }).catch(e => {
    console.error('Unable to connect to the database:', e);
  })
}