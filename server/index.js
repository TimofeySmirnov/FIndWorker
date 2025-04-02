require('dotenv').config()
const express = require('express');
const cors = require('cors');
const sequelize = require('./db')
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload());

app.use('/api', router)



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()