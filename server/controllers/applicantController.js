const {Applicant,
    Resume,
    RecallVacancy, Vacancy, Admin
} = require('../Models/Models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const validity = require('../functions/validations/validityData')
const validityPassword = require('../functions/validations/validityPassword')
const {changeEmail, changePassword} = require('../functions/changeImportantData')
require('dotenv').config()

const generateJwt = require('../functions/generateJWT')


class ApplicantController{
    static async registration(req, res, ){
        try {
            const {firstName, lastName, middleName, phoneNumber, email, password} = req.body;
            if(!firstName || !lastName || !phoneNumber || !email || !password){
                return res.status(400).json({message: 'Заполните поля'})
            }
            const { error } = validity({email, password, phoneNumber});

            if (error) {
                return res.status(400).json({ errors: error.details.map((err) => err.message) });
            }
            const findEmail = await Applicant.findOne({ where: { email } })
            if (findEmail) {
                return res.status(400).json({message: 'Соискатель с таким Email уже существует'})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const jwtVersion = uuid.v4()
            const applicant = await Applicant.create({
                firstName,
                lastName,
                middleName,
                phoneNumber,
                email,
                password: hashPassword,
                jwtVersion: jwtVersion

            })
            const token = generateJwt(applicant.id, jwtVersion, applicant.role);
            return res.status(200).json({token, applicant})
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
            const findApplicant = await Applicant.findOne({
                where:{ email: email} });
            if (!findApplicant) {
                return res.status(404).json({message: 'Соискатель с таким email не найден'})
            }
            let checkPassword = await bcrypt.compare(password, findApplicant.password)
            if(!checkPassword){
                return res.status(400).json({message: 'Введен неверный пароль'})
            }
            const jwtVersion = uuid.v4()
            const token = generateJwt(findApplicant.id, jwtVersion, findApplicant.role)
            await findApplicant.update({jwtVersion: jwtVersion})
            return res.json({token})
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }

    static async checkJwtApplicant(req, res){
        const {id, jwt} = req.body;
        try{
            const applicant = await Applicant.findByPk(id)
            if(!applicant){
                return res.status(404).json({status: false})
            }
            if(applicant.jwtVersion !== jwt){
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
            const applicant = await Applicant.findOne({
                where: {id: id }, include: [{
                    model: Resume, as: 'resumes',
                }], attributes: {
                    exclude: ['password', 'jwtVersion']
                }

            });
            if (!applicant) {
                return res.status(404).json({message: 'Соискатель не найден'})
            }
            return res.json(applicant)
        }
        catch(err) {
            return res.status(500).send({error: err})
        }
    }


    static async getMe(req, res) {
        const {id} = req.user
        try{
            const applicant = await Applicant.findByPk(id, {
                include: [
                    {
                        model: Vacancy,
                        through: { model: RecallVacancy }, // Указываем связь через RecallVacancy
                        as: 'vacancies'
                    },
                    {
                        model: Resume,
                        as: 'resumes',
                    }
                ], attributes: {
                    exclude: ['password', 'jwtVersion']
                }
            })
            if (!applicant) {
                return res.status(404).json({message: 'Соискатель не найден'})
            }
            return res.status(200).json(applicant)
        }catch(err) {
            return res.status(500).send({error: err.message})
        }

    }


    static async update(req, res) {
        const newData = req.body
        const {id} = req.user;
        if(newData.password || newData.email || newData.role){
            return res.status(400).json({message: 'Недоступные для обновления поля'})
        }
        try{
            const applicant = await Applicant.findByPk(id)
            if (!applicant) {
                return res.status(404).json({message: 'Соискатель не найден'})
            }

            await applicant.update(newData)
            res.status(200).json({message: 'Соискатель обновлен'})
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async changePassword(req, res) {
        const {oldPassword, newPassword} = req.body;
        const {id} = req.user
        if(!oldPassword || !newPassword){
            return res.status(400).json({message: 'Указаны не все данные для обновления'})
        }
        const changes = await changePassword(id, oldPassword, newPassword, Applicant)
        return res.status(changes.status).json(changes)
    }

    static async changeEmail(req, res) {
        const {newEmail, password} = req.body;
        const {id} = req.user
        if(!newEmail || !password){
            return res.status(400).json({message: 'Указаны не все данные для обновления'})
        }
        const changes = await changeEmail(id, newEmail, password, Applicant)
        return res.status(changes.status).json(changes)
    }
}

module.exports =  ApplicantController;