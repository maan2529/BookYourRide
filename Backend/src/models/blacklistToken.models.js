const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24h

    }

})

const BlacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema)
module.exports = BlacklistTokenModel