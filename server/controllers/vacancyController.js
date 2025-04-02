const {Vacancy, Employee, Busyness, Currency, WorkFormat, WorkExperience, Position, Resume,
    RecallVacancy, Applicant} = require('../Models/Models')
const {Router} = require("express");
const Sequelize = require("sequelize");
const {Op} = require("sequelize");

class VacancyController{
    static async getAll(req, res){
        try{
            const {  idBusyness, idCurrency,
                idWorkFormat, idWorkExperience,
                idPosition, idEmployee, name, limit = 10, page = 1 } = req.query;
            const limitNum = parseInt(limit);
            const pageNum = parseInt(page);
            const offset = (pageNum - 1) * limitNum;
            const filters = {status: 'ACTIVE'};
            if (idBusyness) filters.idBusyness = idBusyness;
            if (idCurrency) filters.idCurrency = idCurrency;
            if (idWorkFormat) filters.idWorkFormat = idWorkFormat;
            if (idEmployee) filters.idEmployee = idEmployee;
            if (idPosition) filters.idPosition = idPosition;
            if (idWorkExperience) filters.idWorkExperience = idWorkExperience;
            if(name) filters.name = {
                [Op.iLike]: `%${name}%`,
            };

            const vacancies = await Vacancy.findAndCountAll({
                where: filters,
                include: [
                    { model: Employee, as: "employee", attributes: ["name", "address"] },
                    { model: Busyness, as: "busyness", attributes: ["nameBusyness"] },
                    { model: Currency, as: "currency", attributes: ["currency", "symbol"] },
                    { model: WorkFormat, as: "work_format", attributes: ["name"] },
                    { model: WorkExperience, as: "work_experience", attributes: ["name"] },
                    { model: Position, as: "position", attributes: ["name"] }
                ],
                limit: parseInt(limitNum),
                offset: parseInt(offset)
            });

            return res.json(vacancies);
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async getById(req, res){
        const {id} = req.params;

        try{
            const vacancy = await Vacancy.findOne({
                where: {id: id }, include: [
                    { model: Employee, as: "employee", attributes: ["name", "address"] },
                    { model: Busyness, as: "busyness", attributes: ["nameBusyness"] },
                    { model: Currency, as: "currency", attributes: ["currency", "symbol"] },
                    { model: WorkFormat, as: "work_format", attributes: ["name"] },
                    { model: WorkExperience, as: "work_experience", attributes: ["name"] },
                    { model: Position, as: "position", attributes: ["name"] }
                ]})
            if(!vacancy) return res.status(404).json({message: 'Вакансия не найдена'})
            return res.status(200).json(vacancy)
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async changeStatus(req, res){
        const {id} = req.params;
        const { id: IdAuthEmployee} = req.user;

        try{

            const vacancy = await Vacancy.findByPk(id)
            if(!vacancy){
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            if(Number(IdAuthEmployee) !== vacancy.idEmployee){
                return res.status(403).json({message: 'Нельзя обновлять вакансии других работодателей'})
            }
            if(!["ACTIVE", "CLOSED"].includes(vacancy.status)){
                return res.status(400).json({message: 'Нельзя сменить статус. Вакансия модерируется или отклонена'})
            }
            vacancy.status = vacancy.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
            await vacancy.save();
            return res.status(200).json({message: 'Статус вакансии изменен', status: vacancy.status});
        }catch(err){
            return res.status(500).send({error: err.message})
        }
    }

    static async getTopVacancies(req, res) {
        try {
            const topVacancies = await Vacancy.findAll({where : {status: 'ACTIVE'},
                include: [
                    {
                        model: Applicant,
                        as: "applicants",
                        attributes: [],
                    },
                    {
                        model: Currency,
                        as: "currency",
                        attributes: ["symbol"],
                    }
                ],
                attributes: [
                    "id",
                    "name",
                    "description",
                    "minimumPayment",
                    "maximumPayment",
                    [Sequelize.fn("COUNT", Sequelize.col("applicants.id")), "applicantCount"]
                ],
                group: ["vacancy.id",
                    "applicants->recall_vacancy.id", "currency.id"],
                order: [[Sequelize.col("applicantCount"), "DESC"]],
                limit: 10, // Лимит 10 записей
                subQuery: false

            });

            return res.status(200).json(topVacancies);
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка сервера', details: error.message });
        }
    }

    static async createVacancy(req, res){
        const {name,
            description,
            officeHours,
            workSchedule,
            address,
            minPay,
            maxPay,
            needResume,
            idBusyness,
            idCurrency,
            idWorkFormat,
            idWorkExperience,
            idPosition
            } = req.body;
        const status = 'MODERATION'
        const {id} = req.user;
        if(!name || !description){
            return res.status(400).json({message: 'Заполните обязательные поля'})
        }
        try {
            const vacancy = await Vacancy.create({
                name,
                description,
                officeHours: officeHours,
                workSchedule,
                Address: address,
                minimumPayment:minPay,
                maximumPayment:maxPay,
                needResume,
                idBusyness,
                idCurrency,
                idWorkFormat,
                idWorkExperience,
                idPosition,
                idEmployee: id,
                status,
            })
            return res.status(200).json({message: 'Вакансия успешно создана и отправлена на модерацию'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    static async update(req, res){
        const {id} = req.params;
        const {id: idEmployee} = req.user;
        const { status, ...newData } = req.body;
        newData.status = 'MODERATION';
        try{
            const vacancy  = await Vacancy.findByPk(id);
            if(!vacancy){
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            if(vacancy.idEmployee !== Number(idEmployee)){
                return res.status(403).json({message: 'Нельзя обновлять чужую вакансию'})
            }
            await vacancy.update(newData);

            return res.status(200).json({message:'Вакансия успешно обновлена и отправлена на модерацию'})
        }catch (e) {
            return res.status(500).json({error: e.message})
        }

    }

    static async delete(req, res){
        const {id} = req.params;
        const {id: idEmployee} = req.user;
        try {
            const vacancy = await Vacancy.findByPk(id);
            if(!vacancy){
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            if(vacancy.idEmployee !== Number(idEmployee)){
                return res.status(403).json({message: 'Нельзя удалить чужую вакансию'})
            }
            await vacancy.destroy();
            return res.status(200).json({message: 'Вакансия успешно удалена'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    static async getMyVacancies(req, res) {
        const {id} = req.user;
        try{
            const vacancies = await Vacancy.findAll({where: {idEmployee: parseInt(id, 10)}, include: [
                    {
                        model: Position,
                        as: "position",
                        attributes: ['name'],
                    }
                ]})
            if(vacancies.length === 0){
                return res.status(404).json({message: 'Вакансии не найдены'})
            }
            return res.status(200).json(vacancies)
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

}

module.exports = VacancyController