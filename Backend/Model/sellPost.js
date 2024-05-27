const Sequelize = require('sequelize');
const sequelize = require('.././util/database');

const user = require("../Model/user")


const SellPost = sequelize.define('sellpost', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    owner: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

SellPost.belongsTo(user, { foreignKey: 'email' });
module.exports = SellPost; 