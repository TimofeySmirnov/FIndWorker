const jwt = require('jsonwebtoken')
const {Applicant, Employee, Admin} = require("../Models/Models");
require('dotenv').config()

const roleModelMap = {
    'USER': Applicant,
    'EMPLOYEE': Employee,
    'ADMIN': Admin
};
module.exports = function(roles=[]){
    return async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Не авторизован" });
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded
        const modelName = roleModelMap[decoded.role];
        if (!roles.includes(decoded.role) || !modelName) {
            return res.status(403).json({ message: 'Нет доступа' });
        }
        let version;
        if(decoded.jwtVersion !== undefined) {
            version = decoded.jwtVersion;
        }
        if(decoded.versionJwt !== undefined){
            version = decoded.versionJwt;
        }
        const user = await modelName.findOne({ where: { id: decoded.id, jwtVersion: version } });

        if (!user) {
            return res.status(401).json({ message: 'Сессия устарела или пользователь не найден' });
        }
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован ale"})
        next(e);
    }}
};