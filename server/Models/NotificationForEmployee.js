const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const NotificationsForEmployee = sequelize.define('notifications_employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idEmployee: {type: DataTypes.INTEGER, allowNull: false},
    body: {type: DataTypes.TEXT, allowNull: true},
    isRead: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
})

module.exports = NotificationsForEmployee;