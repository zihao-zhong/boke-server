const fs = require('fs');
const path = require('path');

module.exports = function initModels(sequelize) {
  fs.readdir(__dirname, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const models = data.filter(d => d !== 'index.js');
    for(let i = 0; i < models.length; i++) {
      const model = require(path.join(__dirname, models[i]));
      const config = model.getConfig();
      const modelName = models[i].split('.')[0];
      model.init(config.fields, { ...config.options, modelName, sequelize });

      // const config = require(path.join(__dirname, models[i]));
      // const Model = sequelize.define(modelName, config.fields, config.options);
    }
  });
};
