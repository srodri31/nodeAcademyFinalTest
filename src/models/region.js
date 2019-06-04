const Sequelize = require('sequelize');
const sequelize = require('../config/db');

class Region extends Sequelize.Model {}
Region.init({
    code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    country: Sequelize.STRING
  }, { 
    sequelize,
    timestamps: false, 
    modelName: 'regions' 
  });

module.exports = Region;