const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const Resume = sequelize.define('resume', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idApplicant: {type: DataTypes.INTEGER, allowNull: false},
    idPosition: {type: DataTypes.INTEGER, allowNull: false},
    education: {type: DataTypes.TEXT, allowNull: true},
    skills: {type: DataTypes.TEXT, allowNull: true},
    experience: {type: DataTypes.TEXT, allowNull: true},
    city: {type: DataTypes.TEXT, allowNull: true},
    links: {type: DataTypes.TEXT, allowNull: true},
})

module.exports = Resume;