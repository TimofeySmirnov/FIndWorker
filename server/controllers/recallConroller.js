const {Applicant, Vacancy, Resume, RecallVacancy, NotificationsForApplicant, NotificationsForEmployee} = require("../Models/Models");

class recallController {
    static async applyVacancy(req, res) {
        const {id} = req.params;
        const {idResume} = req.body;
        const {id: idApplicant} = req.user;

        try {
            const applicant = await Applicant.findByPk(idApplicant);
            if (!applicant) {
                return res.status(404).json({message: 'Соискатель не найден'})
            }
            const vacancy = await Vacancy.findByPk(id);
            if (!vacancy) {
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            if(vacancy.status !== "ACTIVE"){
                return res.status(400).json({message: 'Работодатель закрыл набор на данную вакансию или вакансия на модерации'})
            }
            if(vacancy.needResume === true){

                const sendResume = await Resume.findByPk(idResume);
                if (!sendResume) {
                    return res.status(404).json({message: 'Резюме не найдено'})
                }
                if(vacancy.idPosition !== sendResume.idPosition) {
                    return res.status(404).json({message: 'Должность, указанная в резюме не соответствует должности вакансии'})
                }
            }

            const [recall, created] = await RecallVacancy.findOrCreate({
                where: { idApplicant: idApplicant, idVacancy: vacancy.id , idResume: idResume || null },
            });
            if (!created) {
                return res.status(400).json({ message: 'Вы уже откликнулись на эту вакансию' });
            }
            return res.status(200).json({ message: 'Отклик на вакансию успешно отправлен' });
        }
        catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async getAllRecallsByVacancy(req, res) {
        const {id} = req.params;
        const {id: idAuthEmployee} = req.user;
        try{
            const vacancy = await Vacancy.findByPk(id);
            if (!vacancy) {
                return res.status(404).json({message: 'Вакансия не найдена'})
            }
            if(vacancy.idEmployee !== Number(idAuthEmployee)){
                return res.status(403).json({message: 'Нельзя посмотреть отклики на чужую вакансию'})
            }
            const recalls = await RecallVacancy.findAll({where: {idVacancy: id}, include: [
                    {
                        model: Applicant,
                        as: 'applicant',
                        attributes: ['firstName', 'lastName'],
                    }
                ]});
            if (recalls.length === 0) {
                return res.status(404).json({message: 'Отлкики не найдены'})
            }
            return res.status(200).json(recalls)
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async getMyRecalls(req, res) {
        const {id: idAuthApplicant} = req.user;
        try{
            const recalls = await RecallVacancy.findAll({where: {idApplicant:idAuthApplicant}});
            if (recalls.length === 0) {
                return res.status(404).json({message: 'Отклики не найдены'})
            }
            return res.status(200).json({recalls: recalls})
        }catch (err){
            return res.status(500).json({error: err.message})
        }
    }

    static async approveRecall(req, res) {
        const {id} = req.params;
        const {id: idAuthEmployee} = req.user;
        try{
            const recall = await RecallVacancy.findByPk(id);
            if (!recall) {
                return res.status(404).json({message: 'Отклик не найден'})
            }
            if(recall.status !== 'PENDING'){
                return res.status(400).json({message: 'Вы уже рассмотрели отклик данного соискателя'})
            }
            const vacancyForRecall = await Vacancy.findByPk(recall.idVacancy);
            if (!vacancyForRecall) {
                return res.status(404).json({message: 'Вакансия в отклике не найдена'})
            }
            if(vacancyForRecall.idEmployee !== Number(idAuthEmployee)){
                return res.status(403).json({message: 'Нельзя менять статус откликов на чужую вакансию'})
            }
            await recall.update({status: 'APPROVED'})
            await NotificationsForApplicant.
            create({idApplicant: recall.idApplicant, body: `Ваш отклик на ${vacancyForRecall.name} одобрен`})
            return res.status(200).json({message: 'Отклик одобрен'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    static async rejectRecall(req, res) {
        const {id} = req.params;
        const {id: idAuthEmployee} = req.user;
        try{
            const recall = await RecallVacancy.findByPk(id);
            if (!recall) {
                return res.status(404).json({message: 'Отклик не найден'})
            }
            if(recall.status !== 'PENDING'){
                return res.status(400).json({message: 'Вы уже рассмотрели отклик данного соискателя'})
            }
            const vacancyForRecall = await Vacancy.findByPk(recall.idVacancy);
            if (!vacancyForRecall) {
                return res.status(404).json({message: 'Вакансия в отклике не найдена'})
            }
            if(vacancyForRecall.idEmployee !== Number(idAuthEmployee)){
                return res.status(403).json({message: 'Нельзя менять статус откликов на чужую вакансию'})
            }
            await recall.update({status: 'REJECTED'})
            await NotificationsForApplicant.
            create({idApplicant: recall.idApplicant, body: `Ваш отклик на ${vacancyForRecall.name} отклонен`})
            return res.status(200).json({message: 'Отклик отклонен'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }


}

module.exports = recallController;