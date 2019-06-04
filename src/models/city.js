const Sequelize = require('sequelize');
const sequelize = require('../config/db');

class City extends Sequelize.Model {}
City.init({
    code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    latitude: Sequelize.DECIMAL,
    longitude: Sequelize.DECIMAL,
    population: Sequelize.INTEGER,
    region: Sequelize.STRING,
    country: Sequelize.STRING
  }, { 
    sequelize,
    timestamps: false, 
    modelName: 'cities' 
  });

module.exports = City;