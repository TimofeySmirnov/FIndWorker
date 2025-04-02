const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const WorkExperience = sequelize.define('work_experience', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(50), allowNull: true},
})

module.exports = WorkExperience;