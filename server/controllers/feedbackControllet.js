const {Feedback, Employee, Applicant} = require("../Models/Models");
const leoProfanity = require('leo-profanity');
leoProfanity.add(leoProfanity.getDictionary('ru'));
const Sequelize = require("sequelize");

const allowRates = [1, 2, 3, 4, 5]

class FeedbackController {
    static async getAllByIdEmployee(req, res) {
        const {id} = req.params;
        try{
            const feedbacks = await Feedback.findAll({where:{idEmployee: id}, include: [
                {
                    model: Applicant,
                    as: 'applicant',
                    attributes: ['id', 'firstName', 'lastName'] // Какие поля вернуть из компании
                }
            ], })

            const avgResult = await Feedback.findOne({
                where: { idEmployee: id },
                attributes: [[Sequelize.fn("ROUND", Sequelize.fn("AVG", Sequelize.col("rate")), 1), "avgRating"]],
            });

            if(feedbacks.length === 0){
                return res.status(404).json({message: 'Отзывы не найдены', avgRating: 0})
            }
            return res.status(200).json({
                avgRating: avgResult?.dataValues?.avgRating || 0,
                feedbacks,
            });
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }

    static async createFeedback(req, res) {
        const {id} = req.params;
        const {name, description} = req.body;
        const rate = Number(req.body.rate);
        const {id: idEntry} = req.user;
        if(!name || !description || isNaN(rate)){
            return res.status(400).json({message: 'Заполните поля'})
        }
        if(!allowRates.includes(rate)){
            return res.status(400).json({message: 'Указана невалидная оценка'})
        }
        try{
            const employee = await Employee.findByPk(id);
            if(!employee){
                return res.status(400).json({message: 'Такой работодатель не существует'})
            }
            const censorName = leoProfanity.clean(name)
            const censorDescription = leoProfanity.clean(description)
            await Feedback.create({name: censorName, description: censorDescription, rate, idApplicant: idEntry, idEmployee: id})
            return res.status(200).json({message: 'Отыв успешно размещен'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async updateFeedback(req, res) {
        const {id} = req.params;
        const {name, description} = req.body;
        const rate = Number(req.body.rate);
        const {id: idEntry} = req.user;
        if(!name || !description || isNaN(rate)){
            return res.status(400).json({message: 'Заполните поля'})
        }
        if(!allowRates.includes(rate)){
            return res.status(400).json({message: 'Указана невалидная оценка'})
        }
        try{
            const censorName = leoProfanity.clean(name)
            const censorDescription = leoProfanity.clean(description)
            const feedback = await Feedback.findByPk(id)
            if(!feedback){
                return res.status(404).json({message: 'Отзыв не найден'})
            }
            if(feedback.idApplicant !== Number(idEntry)){
                return res.status(403).json({message: 'Нельзя обновить чужой отзыв'})
            }
            await feedback.update({name: censorName, description: censorDescription, rate})
            return res.status(200).json({message: 'Отыв успешно обновлен'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async deleteFeedback(req, res) {
        const {id} = req.params;
        const {id: idEntry} = req.user;
        try {
            const feedback = await Feedback.findByPk(id);
            if(!feedback){
                return res.status(404).json({message: 'Отзыв не найден'})
            }
            if(feedback.idApplicant !== Number(idEntry)){
                return res.status(403).json({message: 'Нельзя удалить чужой отзыв'})
            }
            await feedback.destroy()
            return res.status(200).json({message: 'Отзыв успешно удален'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }
}

module.exports = FeedbackController;