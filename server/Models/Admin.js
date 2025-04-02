const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
    jwtVersion: {type: DataTypes.TEXT, allowNull: true},
})

module.exports = Admin;