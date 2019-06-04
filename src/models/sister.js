const Sequelize = require('sequelize');
const sequelize = require('../config/db');

class Sister extends Sequelize.Model {}
Sister.init({
    city1: Sequelize.STRING,
    city2: Sequelize.STRING
  }, { 
    sequelize,
    timestamps: false, 
    modelName: 'sisters' 
  });
Sister.removeAttribute('id');

module.exports = Sister;