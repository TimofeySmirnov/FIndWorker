const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const RecallVacancy = sequelize.define('recall_vacancy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING(50), allowNull: false, defaultValue:'PENDING'},
    idApplicant: { type: DataTypes.INTEGER, allowNull: false},
    idVacancy: { type: DataTypes.INTEGER, allowNull: false},
    idResume: { type: DataTypes.INTEGER, allowNull: true},
})

module.exports = RecallVacancy