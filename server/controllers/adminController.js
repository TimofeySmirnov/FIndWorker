const {Applicant, Employee, RecallVacancy, Feedback, Vacancy, Resume, Busyness, Currency, WorkExperience, WorkFormat,
    Position, NotificationsForEmployee, NotificationsForApplicant, Admin
} = require("../Models/Models");
const uuid = require('uuid')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()


const generateJwt = (id, versionJwt, role) => {
    return jwt.sign(
        {id, versionJwt, role},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
}

const deleteFunction = async (id, nameModel)=>{
    try {
        const removeData = await nameModel.findByPk(id)
        if(!removeData){
            return {status: 404, message: 'Запись не найдена'};
        }
        await removeData.destroy();
        return {status: 200, message: 'Запись удалена'};
    }
    catch(err){
        return {status: 500, error: err.message};
    }
}

const getAllFunction = async (nameModel)=>{
    try {
        const getData = await nameModel.findAll();
        if(getData.length === 0){
            return {status: 404, message: 'Записи не найдены'};
        }
        return {status: 200, getData};
    }catch(err){
        return {status: 500, error: err.message};
    }
}

const updateFunction = async (id, nameModel, updateData) => {
    try {
        const updatedFields = {};
        for (const key in updateData) {
            if (updateData[key] !== undefined) {
                updatedFields[key] = updateData[key];
            }
        }
        if (Object.keys(updatedFields).length === 0) {
            return { status: 400, message: 'Не переданы поля для обновления' };
        }
        const updateALe = await nameModel.findByPk(id)
        if(!updateALe){
            return {status: 404, message: 'Запись не найдена'}
        }
        await updateALe.update(updatedFields);
        return { status: 200, message: 'Запись обновлена' };
    } catch (err) {
        return { status: 500, error: err.message };
    }
};

const getAllByIdFunction = async (id, nameModel, searchField) => {
    try{
        const findData = await nameModel.findAll({where: {[searchField]: id}});
        if(findData.length === 0){
            return {status: 404, message: 'Записи не найдены'}
        }
        return {status: 200, findData};
    }catch(err){
        return {status: 500, error: err.message};
    }
}

class AdminController {
    static async login(req, res){
        const {login, password, secretKey} = req.body;
        try{
            const admin = await Admin.findOne({where: {login: login}});
            if(!admin){
                return res.status(404).json({message: 'Такого администратора не существует'})
            }
            let checkPassword = await bcrypt.compare(password, admin.password)
            if(!checkPassword){
                return res.status(400).json({message: 'Введен неверный пароль'})
            }
            if(secretKey !== process.env.SECRET_KEY_ADMIN){
                return res.status(400).json({message: 'Указан неверный ключ доступа'})
            }
            const jwtVersion = uuid.v4()
            await admin.update({jwtVersion: jwtVersion})
            const token = generateJwt(admin.id, jwtVersion, admin.role)
            return res.json({token})
        }catch(err){
            return res.status(400).send({error: err.message});
        }
    }

    static async createAdmin(req, res){
        const {login, password, secretKey} = req.body;
        if(!login || !password || !secretKey){
            return res.status(400).json({message: 'Заполните поля'})
        }
        try{
            const admin = await Admin.findOne({where: {login: login}})
            if(admin){
                return res.status(400).json({message: 'Администратор с таким лоигном уже существует'})
            }
            if(secretKey !== process.env.SECRET_KEY_ADMIN){
                return res.status(400).json({message: 'Указан неверный ключ доступа'})
            }
            const jwtVersion = uuid.v4()
            const hashPassword = await bcrypt.hash(password, 5);
            const newAdmin = await Admin.create({login, password: hashPassword, jwtVersion: jwtVersion});
            const token = generateJwt(newAdmin.id, jwtVersion, newAdmin.role)
            return res.status(200).json({token})
        }catch(err){
            return res.status(500).send({error: err.message});
        }
    }

    static async checkJwtAdmin(req, res){
        const {id, jwt} = req.body;
        try{
            const admin = await Admin.findByPk(id)
            if(!admin){
                return res.status(404).json({status: false})
            }
            if(admin.jwtVersion !== jwt){
                return res.status(404).json({status: false})
            }
            return res.status(200).json({status: true})
        }catch(err){
            return res.status(500).send({error: err.message, status: false});
        }
    }

    static async getAllApplicants(req, res) {
        const get = await getAllFunction(Applicant);
        return res.status(get.status).json(get);
    }

    static async getAllEmployees(req, res) {
        const get = await getAllFunction(Employee);
        return res.status(get.status).json(get);
    }

    static async getAllRecallsById(req, res) {
        const {id} = req.params;
        const idVacancy = "idVacancy"
        const get = await getAllByIdFunction(id, RecallVacancy, idVacancy);
        return res.status(get.status).json(get);
    }

    static async getAllFeedbacksById(req, res) {
        const {id} = req.params;
        const idEmployee = "idEmployee"
        const get = await getAllByIdFunction(id, Feedback, idEmployee);
        return res.status(get.status).json(get);
    }

    static async getModerationVacancies(req, res) {
        try{
            const moderVacancies = await Vacancy.findAll({where: {status: 'MODERATION'},
                include:[
                    {
                        model: Employee,
                        as: 'employee',
                        attributes: ['name'],
                    },{
                model: Position,
                        as: 'position',
                        attributes: ['name'],
                    }
                ]})
            if (moderVacancies.length === 0) {
                return res.status(404).json({message: 'Вакансии на модерации не найдены'})
            }
            return res.status(200).json(moderVacancies)
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async deleteApplicant(req, res) {
        const {id} = req.params
        const remove = await deleteFunction(id, Applicant)
        return res.status(remove.status).json(remove)
    }

    static async deleteEmployee(req, res) {
        const {id} = req.params
        const remove = await deleteFunction(id, Employee)
        return res.status(remove.status).json(remove)
    }

    static async deleteRecall(req, res) {
        const {id} = req.params
        try{
            const recall = await RecallVacancy.findByPk(id)
            if (!recall) {
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            const vacancy = await Vacancy.findByPk(recall.idVacancy)
            await recall.destroy()
            await NotificationsForApplicant.create({idApplicant: recall.idApplicant, body: `Ваш отклик на вакансию "${vacancy.name}" удален за несоответствие правилам платформы. 
            Пожалуйста, убедитесь, что ваш отклик корректен и соответствует требованиям вакансии.`})
            return res.status(200).json({message: 'Запись удалена, уведомление отправлено'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async deleteFeedback(req, res) {
        const {id} = req.params
        try{
            const feedback = await Feedback.findByPk(id)
            if (!feedback) {
                return res.status(404).json({message: 'Отзыв не найден'})
            }
            const employee = await Employee.findByPk(feedback.idEmployee)
            await feedback.destroy()
            await NotificationsForApplicant.create({idApplicant: feedback.idApplicant, body: `Ваш отзыв на "${employee.name}" удален за нарушения правил платформы.`})
            return res.status(200).json({message: 'Запись удалена, уведомление отправлено'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async deleteVacancy(req, res) {
        const {id} = req.params
        try{
            const vacancy = await Vacancy.findByPk(id)
            if (!vacancy) {
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            await vacancy.destroy()
            await NotificationsForEmployee.create({idEmployee: vacancy.idEmployee, body: `Ваша вакансия "${vacancy.name}" удалена за нарушения политики сайта`})
            return res.status(200).json({message: 'Запись удалена, уведомление отправлено'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async deleteResume(req, res) {
        const {id} = req.params
        try{
            const resume = await Resume.findByPk(id)
            if (!resume) {
                return res.status(404).json({message: 'Резюме не найдено'})
            }
            await resume.destroy()
            await NotificationsForApplicant.create({idApplicant: resume.idApplicant, body: `Ваше резюме удалено за нарушения политики сайта`})
            return res.status(200).json({message: 'Запись удалена, уведомление отправлено'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async approveVacancy(req, res) {
        const {id} = req.params
        try{
            const vacancy = await Vacancy.findByPk(id)
            if (!vacancy) {
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            if(vacancy.status === 'ACTIVE' || vacancy.status === 'CLOSED'){
                return res.status(400).json({message: 'Вакансия уже прошла модерацию'})
            }
            vacancy.status = 'ACTIVE'
            await vacancy.save()
            await NotificationsForEmployee.
            create({idEmployee: vacancy.idEmployee, body: `Ваша вакансия ${vacancy.name} одобрена и размещена на сайте`})
            return res.status(200).json({message: 'Вакансия одобрена'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async rejectVacancy(req, res) {
        const {id} = req.params
        try{
            const vacancy = await Vacancy.findByPk(id)
            if (!vacancy) {
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            if(vacancy.status === 'ACTIVE' || vacancy.status === 'CLOSED'){
                return res.status(400).json({message: 'Вакансия уже прошла модерацию'})
            }
            vacancy.status = 'REJECTED'
            await vacancy.save()
            await NotificationsForEmployee.
            create({idEmployee: vacancy.idEmployee, body: `Ваша вакансия ${vacancy.name} отклонена.
            Вакансия не соответствует правилам размещения. Проверьте корректность данных и повторите отправку.`})
            return res.status(200).json({message: 'Вакансия отклонена'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async getAllBusyness(req, res) {
        const get = await getAllFunction(Busyness);
        return res.status(get.status).json(get);
    }

    static async getAllCurrencies(req, res) {
        const get = await getAllFunction(Currency);
        return res.status(get.status).json(get);
    }

    static async getAllWorkExperiences(req, res) {
        const get = await getAllFunction(WorkExperience);
        return res.status(get.status).json(get);
    }

    static async getAllWorkFormats(req, res) {
        const get = await getAllFunction(WorkFormat);
        return res.status(get.status).json(get);
    }

    static async getAllPositions(req, res) {
        const get = await getAllFunction(Position);
        return res.status(get.status).json(get);
    }

    static async createBusyness(req, res) {
        const {nameBusyness} = req.body;
        if(!nameBusyness) {
            return res.status(400).json({message: 'Заполните поля'})
        }
        try{
            await Busyness.create({nameBusyness});
            return res.status(201).json({message: 'Тип занятость добавлен'})
        }catch (err){
            return res.status(500).json({error: err.message})
        }
    }

    static async createCurrency(req, res) {
        const {currency, symbol} = req.body;
        if(!currency || !symbol) {
            return res.status(400).json({message: 'Заполните поля'})
        }
        try{
            await Currency.create({currency, symbol});
            return res.status(201).json({message: 'Валюта добавлена'})
        }catch (err){
            return res.status(500).json({error: err.message})
        }
    }

    static async createWorkExperience(req, res) {
        const {name} = req.body;
        if(!name) {
            return res.status(400).json({message: 'Заполните поля'})
        }
        try{
            await WorkExperience.create({name});
            return res.status(201).json({message: 'Вид опыта работы добавлен'})
        }catch (err){
            return res.status(500).json({error: err.message})
        }
    }

    static async createWorkFormat(req, res) {
        const {name} = req.body;
        if(!name) {
            return res.status(400).json({message: 'Заполните поля'})
        }
        try{
            await WorkFormat.create({name});
            return res.status(201).json({message: 'Формат работы добавлен'})
        }catch (err){
            return res.status(500).json({error: err.message})
        }
    }

    static async createPosition(req, res) {
        const {name, description} = req.body;
        if(!name || !description) {
            return res.status(400).json({message: 'Заполните поля'})
        }
        try{
            await Position.create({name, description});
            return res.status(201).json({message: 'Должность добавлена'})
        }catch (err){
            return res.status(500).json({error: err.message})
        }
    }

    static async updatePosition(req, res) {
        const { id } = req.params;
        const newData = req.body;
        const update = await updateFunction(id, Position, newData);
        return res.status(update.status).json(update);
    }

    static async updateBusyness(req, res) {
        const { id } = req.params;
        const newData = req.body;
        const update = await updateFunction(id, Busyness, newData);
        return res.status(update.status).json(update);
    }

    static async updateWorkExp(req, res) {
        const { id } = req.params;
        const newData = req.body;
        const update = await updateFunction(id, WorkExperience, newData);
        return res.status(update.status).json(update);
    }

    static async updateWorkFormat(req, res) {
        const { id } = req.params;
        const newData = req.body;
        const update = await updateFunction(id, WorkFormat, newData);
        return res.status(update.status).json(update);
    }

    static async updateCurrency(req, res) {
        const { id } = req.params;
        const newData = req.body;
        const update = await updateFunction(id, Currency, newData);
        return res.status(update.status).json(update);
    }

    static async deleteBusyness(req, res) {
        const { id } = req.params;
        const deleteData = await deleteFunction(id, Busyness);
        return res.status(deleteData.status).json(deleteData);
    }

    static async deleteCurrency(req, res) {
        const { id } = req.params;
        const deleteData = await deleteFunction(id, Currency);
        return res.status(deleteData.status).json(deleteData);
    }

    static async deleteWorkExp(req, res) {
        const { id } = req.params;
        const deleteData = await deleteFunction(id, WorkExperience);
        return res.status(deleteData.status).json(deleteData);
    }

    static async deleteWorkFormat(req, res) {
        const { id } = req.params;
        const deleteData = await deleteFunction(id, WorkFormat);
        return res.status(deleteData.status).json(deleteData);
    }

    static async deletePosition(req, res) {
        const { id } = req.params;
        const deleteData = await deleteFunction(id, Position);
        return res.status(deleteData.status).json(deleteData);
    }
}

module.exports = AdminController;