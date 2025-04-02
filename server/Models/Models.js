const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const Applicant = require('./Applicant');
const Employee = require('./Employee');
const Busyness = require('./Busyness');
const Currency = require('./Currency');
const Feedback = require('./Feedback');
const NotificationsForApplicant = require('./NotificationForApplicant');
const NotificationsForEmployee = require('./NotificationForEmployee');
const Position = require('./Position');
const Admin = require('./Admin');
const RecallVacancy = require('./RecallVacancy');
const Resume = require('./Resume');
const Vacancy = require('./Vacancy');
const WorkFormat = require('./WorkFormat');
const WorkExperience = require('./WorkExperience');

//Соискатель и резюме
Applicant.hasMany(Resume, {foreignKey: 'idApplicant', as: 'resumes'})
Resume.belongsTo(Applicant, {foreignKey: 'idApplicant', as: 'applicant'})

//Соискатель и отзывы
Applicant.hasMany(Feedback, {foreignKey: 'idApplicant', as: 'feedbacks'})
Feedback.belongsTo(Applicant, {foreignKey: 'idApplicant', as: 'applicant'})

//Связь many-to-many соискателя и должностей
Position.hasMany(Resume, {foreignKey: 'idPosition', as: 'resumes'})
Resume.belongsTo(Position, {foreignKey: 'idPosition', as: 'position'})

//Работодатель и отзывы
Employee.hasMany(Feedback, {foreignKey: 'idEmployee', as: 'feedbacks'})
Feedback.belongsTo(Employee, {foreignKey: 'idEmployee', as: 'employee'})

//Связь many-to-many соискателя и вакансий
Applicant.belongsToMany(Vacancy, {through: RecallVacancy, foreignKey: "idApplicant", otherKey: "idVacancy", as: 'vacancies'})
Vacancy.belongsToMany(Applicant, { through: RecallVacancy, foreignKey: "idVacancy", otherKey: "idApplicant", as: 'applicants'});

RecallVacancy.belongsTo(Applicant, { foreignKey: "idApplicant", as: "applicant" });
RecallVacancy.belongsTo(Vacancy, { foreignKey: "idVacancy", as: "vacancy" });

//Связь между занятостью и вакансиями
Busyness.hasMany(Vacancy, {foreignKey: 'idBusyness' , as: "vacancies"})
Vacancy.belongsTo(Busyness, {foreignKey: 'idBusyness' , as: "busyness"})

//Связь между валютой и вакансиями
Currency.hasMany(Vacancy, {foreignKey: 'idCurrency' , as: "vacancies"})
Vacancy.belongsTo(Currency, {foreignKey: 'idCurrency' , as: "currency"})

//Связь между форматом работы и вакансиями
WorkFormat.hasMany(Vacancy, {foreignKey: 'idWorkFormat', as: "vacancies"})
Vacancy.belongsTo(WorkFormat, {foreignKey: 'idWorkFormat', as: "work_format"})

//Связь между опытом работы и вакансиями
WorkExperience.hasMany(Vacancy, {foreignKey: 'idWorkExperience', as: "vacancies"})
Vacancy.belongsTo(WorkExperience, {foreignKey: 'idWorkExperience', as: "work_experience"})

//Связь между должностью и вакансиями
Position.hasMany(Vacancy, {foreignKey: 'idPosition' , as: "vacancies"})
Vacancy.belongsTo(Position, {foreignKey: 'idPosition' , as: "position"})

//Связь между работодателем и вакансиями
Employee.hasMany(Vacancy, {foreignKey: 'idEmployee', as: 'vacancies'})
Vacancy.belongsTo(Employee, {foreignKey: 'idEmployee', as: 'employee'})

Employee.hasMany(NotificationsForEmployee, {foreignKey: 'idEmployee', as: 'notificationsForEmployee'})
NotificationsForEmployee.belongsTo(Employee, {foreignKey: 'idEmployee', as: 'employee'})

Applicant.hasMany(NotificationsForApplicant, {foreignKey: 'idApplicant', as: 'notificationsForApplicant'})
NotificationsForApplicant.belongsTo(Applicant, {foreignKey: 'idApplicant', as: 'applicant'})

module.exports = {
    Applicant,
    Busyness,
    Currency,
    Feedback,
    WorkExperience,
    WorkFormat,
    Resume,
    Vacancy,
    Employee,
    RecallVacancy,
    Position,
    NotificationsForEmployee, NotificationsForApplicant,
    Admin
}