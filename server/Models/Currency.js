const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const Currency = sequelize.define('currency', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    currency: {type: DataTypes.STRING(50), allowNull: true},
    symbol: {type: DataTypes.STRING(1), allowNull: true},
})

module.exports = Currency;