const generateJwt = require('./generateJWT');
const bcrypt = require('bcrypt')
const validityPassword = require( './validations/validityPassword');
const validityEmail  = require('./validations/validityEmail');
const {Applicant} = require( "../Models/Models");
const uuid = require("uuid");

const changePassword = async (idUser, oldPassword, newPassword, nameModel) =>{
    try{
        if(newPassword === oldPassword){
            return {status:400, message: 'Новый пароль совпадает со старым'};
        }
        const { error } = validityPassword({password: newPassword});
        if (error) {
            return {status: 400, errors: error.details.map((err) => err.message) };
        }
        const findField = await nameModel.findByPk(idUser)
        if (!findField) {
            return {status: 404, message: `Такого ${nameModel === Applicant ? 'соискателя' : 'работодателя'} несуществует`}
        }
        let checkOldPassword = await bcrypt.compare(oldPassword, findField.password)
        if(!checkOldPassword){
            return {status: 400, message: 'Введен неверный пароль'}
        }
        const newHashPassword = await bcrypt.hash(newPassword, 5)
        const versionJwt = uuid.v4()
        await findField.update({password: newHashPassword, versionJwt: versionJwt})
        const token = generateJwt(findField.id, versionJwt, findField.role);
        return {status: 200, message: 'Пароль успешно изменен', token}
    }catch(err){
        return {status: 500, error: err.message}
    }
}

const changeEmail = async (idUser, newEmail, password, nameModel) =>{
    try{
        const { error } = validityEmail({email: newEmail});
        if (error) {
            return {status: 400, errors: error.details.map((err) => err.message) };
        }
        const findField = await nameModel.findByPk(idUser)
        if (!findField) {
            return {status: 404, message: `Такого ${nameModel === Applicant ? 'соискателя' : 'работодателя'} несуществует`}
        }
        let checkPassword = await bcrypt.compare(password, findField.password)
        if(!checkPassword){
            return {status: 400, message: 'Введен неверный пароль'}
        }
        await findField.update({email: newEmail})
        const versionJwt = uuid.v4()
        await findField.update({versionJwt: versionJwt})
        const token = generateJwt(findField.id, versionJwt, findField.role);
        return {status: 200, message: 'Почта обновлена', token}
    }catch(err){
        return {status: 500, error: err.message}
    }
}

module.exports = {changeEmail, changePassword}