const {DataTypes} = require('sequelize');
const sequelize = require('../db');


const Employee = sequelize.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    email: {type: DataTypes.TEXT, allowNull: false, unique: true},
    phoneNumber: {type: DataTypes.STRING(50), allowNull: false},
    password: {type: DataTypes.TEXT, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'EMPLOYEE'},
    address: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.TEXT, allowNull: true, defaultValue: 'defaultLogoEmployer.png'},
    jwtVersion: {type: DataTypes.TEXT, allowNull: true},
})

module.exports = Employee;