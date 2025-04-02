const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Busyness = sequelize.define('busyness', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameBusyness: {type: DataTypes.STRING, allowNull: false},
})

module.exports = Busyness;