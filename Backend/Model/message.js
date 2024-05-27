const Sequelize = require('sequelize');
const sequelize = require('.././util/database')
// const conversation = require('../Model/conversation');
const user = require('../Model/user');


const messages = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receiver: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

messages.belongsTo(user, {foreignKey: 'email'});

module.exports = messages; 