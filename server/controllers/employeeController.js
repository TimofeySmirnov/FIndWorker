const {
     Vacancy, Employee, Applicant, Position, Feedback
} = require('../Models/Models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError');
require('dotenv').config()
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const { Op, Sequelize} = require("sequelize");
const validity = require('../functions/validations/validityData');

const generateJwt = require('../functions/generateJWT')
const {changePassword ,changeEmail} = require('../functions/changeImportantData');


class EmployeeController{
    static async registration(req, res, ){
        const {name, description, address, phoneNumber, email, password} = req.body;
        try {
            const { error } = validity({email, password, phoneNumber});

            if (error) {
                return res.status(400).json({ errors: error.details.map((err) => err.message) });
            }

            const img = req.files?.img
            let fileName = 'defaultLogoEmployer.png';
            if(img){
                fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }

            if(!name || !description || !address || !phoneNumber || !email || !password){
                return res.status(400).json({message: 'Заполните поля'})
            }

            const findEmail = await Employee.findOne({ where: { email: email } })
            if (findEmail) {
                return res.status(400).json({message: 'Работодатель с таким email уже зарегистрирован'})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const jwtVersion = uuid.v4()
            const employee = await Employee.create({
                name,
                description,
                address,
                phoneNumber,
                email,
                password: hashPassword,
                img: fileName,
                jwtVersion: jwtVersion
            })
            const token = generateJwt(employee.id, employee.jwtVersion, employee.role);
            return res.status(200).json({token})
        }
        catch(err){
            res.status(500).json({error: err.message})
        }
    }

    static async login(req, res){
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Заполните поля'})
        }
        try {
            const findEmployee = await Employee.findOne({
                where:{ email: email} });
            if (!findEmployee) {
                return res.status(404).json({message: 'Работодатель с таким email не найден'})
            }
            let checkPassword = await bcrypt.compare(password, findEmployee.password)
            if(!checkPassword){
                return res.status(400).json({message: 'Введен неверный пароль'})
            }
            const jwtVersion = uuid.v4()
            await findEmployee.update({jwtVersion: jwtVersion})
            const token = generateJwt(findEmployee.id, jwtVersion, findEmployee.role)
            return res.status(200).json({token})
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }

    static async checkJwtEmployee(req, res){
        const {id, jwt} = req.body;
        try{
            const employer = await Employee.findByPk(id)
            if(!employer){
                return res.status(404).json({status: false})
            }
            if(employer.jwtVersion !== jwt){
                return res.status(404).json({status: false})
            }
            return res.status(200).json({status: true})
        }catch(err){
            return res.status(500).send({error: err.message, status: false});
        }
    }

    static async getById(req, res) {
        const {id} = req.params
        try {
            const employee = await Employee.findOne({
                where: {id: id }

            });
            if (!employee) {
                return res.status(404).json({message: 'Работодатель не найден'})
            }
            return res.json(employee)
        }
        catch(err) {
            return res.status(500).send({error: err})
        }
    }


    static async getAll(req, res) {
        const {searchName} = req.query
        let filter = {}
        if (searchName) {
            filter.name = {
                [Op.iLike]: `%${searchName}%`,
            };
        }
        try{
            const employers = await Employee.findAndCountAll({where: filter, attributes: {
                    exclude: ['password', 'email', 'jwtVersion', 'role']
                }})
            if (employers.length === 0) {
                return res.status(404).json({message: 'Работодатели не найдены'})
            }
            return res.status(200).json(employers)
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }

    static async update(req, res) {

        const newData = { ...req.body };
        const newImg = req.files?.newImg;
        const { id } = req.user;

        if(newData.password || newData.email || newData.role){
            return res.status(400).json({message: 'Недоступные для обновления поля'})
        }
        try {
            const employee = await Employee.findByPk(id);
            if (!employee) {
                return res.status(404).json({ message: 'Работодатель не найден' });
            }
            if (newImg) {
                const fileName = uuid.v4() + path.extname(newImg.name);
                const filePath = path.resolve(__dirname, '..', 'static', fileName);

                await newImg.mv(filePath);
                newData.img = fileName;

                if (employee.img && employee.img !== 'defaultLogoEmployer.png') {
                    const oldFilePath = path.resolve(__dirname, '..', 'static', employee.img);
                    fs.unlink(oldFilePath, (err) => {
                        if (err && err.code !== 'ENOENT') {
                            console.error('Ошибка при удалении файла:', err);
                        }
                    });
                }
            }

            await employee.update(newData);
            return res.status(200).json({ message: 'Работодатель обновлен' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }

    static async getPopular(req, res) {
        try{
            const popularEmployers = await Employee.findAll({
                include: [
                    {
                        model: Vacancy,
                        as: "vacancies",
                        attributes: [],
                    }
                ],
                attributes: [
                    "id",
                    "name",
                    [Sequelize.fn("COUNT", Sequelize.col("vacancies.id")), "vacancyCount"]
                ],
                group: ["employee.id"],
                order: [[Sequelize.col("vacancyCount"), "DESC"]],
                limit: 10, // Лимит 10 записей
                subQuery: false

            });
            if (popularEmployers.length === 0) {
                return res.status(404).json({message: 'Работодатели не найдены'})
            }
            return res.status(200).json(popularEmployers)
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }
    static async changePassword(req, res) {
        const {oldPassword, newPassword} = req.body;
        const {id} = req.user
        if(!oldPassword || !newPassword){
            return res.status(400).json({message: 'Указаны не все данные для обновления'})
        }
        const changes = await changePassword(id, oldPassword, newPassword, Employee)
        return res.status(changes.status).json(changes)
    }

    static async changeEmail(req, res) {
        const {newEmail, password} = req.body;
        const {id} = req.user
        if(!newEmail || !password){
            return res.status(400).json({message: 'Указаны не все данные для обновления'})
        }
        const changes = await changeEmail(id, newEmail, password, Employee)
        return res.status(changes.status).json(changes)
    }
}

module.exports =  EmployeeController;