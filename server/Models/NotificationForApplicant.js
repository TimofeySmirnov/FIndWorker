const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const NotificationsForApplicant = sequelize.define('notifications_applicant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idApplicant: {type: DataTypes.INTEGER, allowNull: false},
    body: {type: DataTypes.TEXT, allowNull: true},
    isRead: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
})

module.exports = NotificationsForApplicant;