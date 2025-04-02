const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Vacancy = sequelize.define('vacancy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idEmployee: {type: DataTypes.INTEGER, allowNull: false},
    idBusyness: {type: DataTypes.INTEGER, allowNull: true},
    idCurrency: {type: DataTypes.INTEGER, allowNull: true},
    idWorkExperience: {type: DataTypes.INTEGER, allowNull: true},
    idWorkFormat: {type: DataTypes.INTEGER, allowNull: true},
    idPosition: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.TEXT, allowNull: true},
    description: {type: DataTypes.TEXT, allowNull: true},
    officeHours: {type: DataTypes.FLOAT, allowNull: true},
    workSchedule: {type: DataTypes.STRING(50), allowNull: true},
    Address: {type: DataTypes.TEXT, allowNull: true},
    needResume: {type: DataTypes.BOOLEAN, allowNull: true},
    minimumPayment: {type: DataTypes.DECIMAL, allowNull: true},
    maximumPayment: {type: DataTypes.DECIMAL, allowNull: true},
    status : {type: DataTypes.STRING(50), allowNull: true, defaultValue:'MODERATION'},
})

module.exports = Vacancy