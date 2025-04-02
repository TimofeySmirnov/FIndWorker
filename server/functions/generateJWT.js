require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function (id, jwtVersion, role){
    return jwt.sign(
        {id, jwtVersion, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}