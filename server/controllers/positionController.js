const {Position, Vacancy} = require ("../Models/Models");
const {Sequelize} = require("sequelize");

class PositionController {
    static async getTopPosition(req, res) {
        try {
            const topPosition = await Position.findAll({
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
                group: ["position.id"],
                order: [[Sequelize.col("vacancyCount"), "DESC"]],
                limit: 10, // Лимит 10 записей
                subQuery: false

            });

            if (topPosition.length === 0) {
                return res.status(404).json({ message: 'Должности не найдены' });
            }

            return res.status(200).json(topPosition);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    static async getById(req, res) {
        const id = parseInt(req.params.id);
        try{
            const position = await Position.findByPk(id);
            if (!position) {
                return res.status(404).json({message: 'Должность не найдена'})
            }
            return res.status(200).json(position);
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }

    static async getAllPositions(req, res) {
        try{
            const positions = await Position.findAll()
            if (positions.length === 0) {
                return res.status(404).json({message: 'Должности не найдены'})
            }
            return res.status(200).json(positions);
        }catch (error){
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PositionController