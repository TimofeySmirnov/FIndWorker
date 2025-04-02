const {Employee, Busyness, Currency, WorkExperience, WorkFormat} = require("../Models/Models");
const {Router} = require("express");

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

class FiltersController {
    static async getAllBusyness (req, res) {
        const get = await getAllFunction(Busyness);
        return res.status(get.status).json(get);
    }

    static async getAllCurrencies (req, res) {
        const get = await getAllFunction(Currency);
        return res.status(get.status).json(get);
    }

    static async getAllWorkExperiences (req, res) {
        const get = await getAllFunction(WorkExperience);
        return res.status(get.status).json(get);
    }

    static async getAllWorkFormats (req, res) {
        const get = await getAllFunction(WorkFormat);
        return res.status(get.status).json(get);
    }
}

module.exports = FiltersController;