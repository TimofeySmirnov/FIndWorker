const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Applicant = sequelize.define('applicant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lastName: {type: DataTypes.STRING, allowNull: false},
    firstName: {type: DataTypes.STRING, allowNull: false},
    middleName: {type: DataTypes.STRING, allowNull: true},
    phoneNumber: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    jwtVersion: {type: DataTypes.TEXT, allowNull: true},
})

module.exports = Applicant;