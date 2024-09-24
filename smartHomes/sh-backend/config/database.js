const { Sequelize } = require('sequelize');

// Create a Sequelize instance with MySQL
const sequelize = new Sequelize('smartHomes', 'root', 'sohini*sahukar', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
