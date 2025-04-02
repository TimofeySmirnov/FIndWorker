const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const Feedback = sequelize.define('feedback', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idEmployee: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.TEXT, allowNull: false},
    idApplicant: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

module.exports = Feedback;