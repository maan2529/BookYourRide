const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const BlacklistTokenModel = require('../models/blacklistToken.models.js');
const Captain = require('../models/captain.models.js');
const authUser = async function (req, res, next) {
    const token = req?.cookies?.token || (req.headers?.authorization && req.headers?.authorization.startsWith("bearer")
        ? req.headers?.authorization.split(" ")[1]
        : null);

    if (!token) {
        return res.status(401).json({ message: "Unauthorize" })
    }

    const blacklistedUser = await BlacklistTokenModel.findOne({ token })

    if (blacklistedUser) {
        return res.status(401).json({ message: "Unauthorize" })
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({ _id: decodedUser._id });

        console.log("user", user)
        req.user = user
        return next()
    } catch (error) {
        throw new Error("auth error "+error)
    }
}

const authCaptain = async function (req, res, next) {
    const token = req?.cookies?.token || (req.headers?.authorization && req.headers?.authorization.startsWith("bearer")
        ? req.headers?.authorization.split(" ")[1]
        : null);

    if (!token) {
        return res.status(401).json({ message: "Unauthorize" })
    }

    const blacklistedUser = await BlacklistTokenModel.findOne({ token })

    if (blacklistedUser) {
        return res.status(401).json({ message: "Unauthorize" })
    }

    try {
        const decodedCaptain = jwt.verify(token, process.env.JWT_SECRET)

        const user = await Captain.findOne({ _id: decodedCaptain._id });
        req.user = user
        return next()
    } catch (error) {
        throw new error(error)
    }
}

module.exports = { authUser, authCaptain }