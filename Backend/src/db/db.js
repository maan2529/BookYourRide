const mongoose = require('mongoose')


function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log("DB connected successfully")
        })
        .catch((err) => {
            console.log("Db connection failed", err)
        })
}

module.exports = connectToDB;
