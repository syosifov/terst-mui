const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete', {
  dialect: 'sqlite',
  storage: './database.sqlite'
});

module.exports = sequelize;
