const fs = require('fs');
const path = require('path');

module.exports = function initModels(sequelize) {
    const models = fs.readdirSync(path.resolve(__dirname)).filter(i => i !== 'index.js')
    for(let i = 0; i < models.length; i++) {
      const model = require(path.join(__dirname, models[i]));
      const config = model.getConfig();
      const modelName = models[i].split('.')[0];
      model.init(config.fields, { ...config.options, modelName, sequelize });

      // const config = require(path.join(__dirname, models[i]));
      // const Model = sequelize.define(modelName, config.fields, config.options);
    }
};
