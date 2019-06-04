const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/nodeacademy');

module.exports = sequelize;