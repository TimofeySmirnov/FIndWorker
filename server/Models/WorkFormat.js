const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const WorkFormat = sequelize.define('work_format', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: true},
})

module.exports = WorkFormat