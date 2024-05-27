const Sequelize = require('sequelize');

const sequelize = new Sequelize('ewu_traders', 'root', '', {
    dialect: 'mysql', host: 'localhost'
});

module.exports = sequelize;