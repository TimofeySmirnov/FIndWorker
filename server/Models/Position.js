const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const Position = sequelize.define('position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(50), allowNull: true},
    description: {type: DataTypes.TEXT, allowNull: true},
})

module.exports = Position;