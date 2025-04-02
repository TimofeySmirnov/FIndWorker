const {RecallVacancy, Resume, Vacancy, Position} =  require( "../Models/Models");

class resumeController{
    static async getById(req, res) {
        const {id} = req.params;
        const {id: idEntry, role} = req.user
        try{
            const resume = await Resume.findByPk(id, {include: [
                    {
                        model: Position,
                        as: 'position'
                    }]})
            if(!resume){
                return res.status(404).json({message: 'Резюме не найдено'})
            }
            const applicantFromResume = resume.idApplicant
            if(Number(applicantFromResume) !== Number(idEntry) && role === 'USER'){
                return res.status(403).json({message: 'Нельзя смотреть чужие резюме'})
            }
            if(role === 'EMPLOYEE'){
                const recallsApplicant = await RecallVacancy.findAll({where: {idApplicant: applicantFromResume}});
                if(recallsApplicant.length === 0){
                    return res.status(404).json({message: 'Отклики соискателя на вакансии не найдены'})
                }
                const vacanciesEntryEmployee = await Vacancy.findAll({where: {idEmployee: idEntry}});
                if(vacanciesEntryEmployee.length === 0){
                    return res.status(404).json({message: 'Ваши вакансии не найдены'})
                }
                //Понять, есть ли в откликах выбранного соискателя recallsApplicant id вакансий вошедшего работодателя
                const idVacancies = vacanciesEntryEmployee.map(vacancy => vacancy.id)
                const recallsForEntryEmployee =  recallsApplicant.filter(recall => idVacancies.includes(recall.idVacancy))
                if(recallsForEntryEmployee.length === 0){
                    return res.status(404).json({message: 'Отклики соискателя на ваши вакансии не найдены'})
                }
                return res.status(200).json(resume)
            }
            return res.status(200).json(resume)
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    static async create(req, res) {
        const{ id } = req.user
        const {idPosition, education, skills, experience, city, links} = req.body
        if(!idPosition ||!education|| !skills|| !experience || !city || !links){
            return res.status(400).json({message: 'Заполните поля'})
        }
        try{
            await Resume.create({idPosition, education, skills, experience, city, links, idApplicant: id})
            return res.status(200).json({message: 'Резюме успешно размещено'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    static async update(req, res) {
        const {id} = req.params;
        const newData = Object.entries(req.body).reduce((acc, [key, value]) => {
            if (value !== undefined) acc[key] = value;
            return acc;
        }, {});
        const {id: idEntryApplicant} = req.user;
        try {
            const resume = await Resume.findByPk(id);
            if(!resume){
                return res.status(404).json({message: 'Резюме не найдено'})
            }
            if(resume.idApplicant !== Number(idEntryApplicant)){
                return res.status(403).json({message: 'Нельзя редактировать чужое резюме'})
            }
            await resume.update(newData)
            return res.status(200).json({message: 'Резюме успешно обновлено'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    static async delete(req, res) {
        const {id} = req.params;
        const {id: idEntryApplicant} = req.user;
        try {
            const resume = await Resume.findByPk(id);
            if(!resume){
                return res.status(404).json({message: 'Резюме не найдено'})
            }
            if(resume.idApplicant !== Number(idEntryApplicant)){
                return res.status(403).json({message: 'Нельзя удалить чужое резюме'})
            }
            await resume.destroy({where: {id}})
            return res.status(200).json({message: 'Резюме успешно удалено'})
        }catch (err){
            return res.status(500).json({message: err.message})
        }
    }

    static async getMyResumes(req, res) {
        const {id} = req.user;
        try{
            const resumes = await Resume.findAll({where: {idApplicant: id}, include: [
                    {
                        model: Position,
                        as: 'position'
                    }]});
            if(resumes.length === 0){
                return res.status(404).json({message: 'Резюме не найдены'})
            }
            return res.status(200).json(resumes)
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }
}

module.exports = resumeController;