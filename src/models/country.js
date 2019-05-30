const Sequelize = require('sequelize');
const sequelize = require('../config/db');

class Country extends Sequelize.Model {}
Country.init({
    code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING
  }, { 
    sequelize,
    timestamps: false, 
    modelName: 'countries' 
  });

module.exports = Country;