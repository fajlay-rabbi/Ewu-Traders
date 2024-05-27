const Sequelize = require('sequelize');
const sequelize = require('.././util/database');
const User = require('../Model/user');
// const messages = require('../Model/message');


const conversation = sequelize.define('conversation', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    msg: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
});

conversation.belongsTo(User, { foreignKey: 'email'});

// conversation.hasMany(messages, { foreignKey: 'id'});



module.exports = conversation; 