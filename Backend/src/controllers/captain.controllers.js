const { validationResult } = require('express-validator');
const Captain = require('../models/captain.models')
const BlacklistTokenModel = require('../models/blacklistToken.models.js')
const option = {
    httpOnly: true,
    secure: false,
}
const registerCaptain = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        const firstname = fullname?.firstname || fullname.split(" ")[0];
        const lastname = fullname?.lastname || fullname.split(" ")[1];
        const { color, plate, capacity, vehicleType } = vehicle

        // console.log(firstname, lastname, email, password, plate, capacity, vehicleType)

        if (!firstname || !email || !password || !plate || !capacity || !vehicleType) {
            res.status(400).json({
                message: "all fields are require"
            });
        }

        const existingCaptain = await Captain.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({
                message: "User already registered with this email"
            });
        }


        const user = await Captain.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType,
            }
        });

        const token = user.generateAuthToken();
        res.cookie("token", token, option)
        res.status(201).json({ token, user });
    } catch (error) {
        console.error("some error in registerUser:", error);
        return res.status(500).json({ error: error.message });
    }
};
const loginCaptain = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;


        const captain = await Captain.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatchPassword = await captain.comparePassword(password)

        if (!isMatchPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = captain.generateAuthToken();

        res.cookie("token", token, option)
        const userReturn = await Captain.findOne({ email }).select('-password')

        res.status(200).json({ token, userReturn });
    } catch (error) {
        console.error("some error in user login:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

const getCaptain = async function (req, res) {
    const captain = req.captain;

    res.status(201).json({
        message: "captain data",
        data: captain
    })
}
const logoutCaptain = async function (req, res) {

    try {
        const user = req.user;

        res.clearCookie('token')
        const token = req.cookies.token || (req.headers?.authorization && req.headers?.authorization.startsWith("bearer")
            ? req.headers?.authorization.split(" ")[1]
            : null);

        await BlacklistTokenModel.create({
            token,
        })


        res.status(200).json({
            message: "logged out sccessfully"
        })

    } catch (error) {
        throw new error("error at logout " + error)
    }
}
module.exports = { registerCaptain, loginCaptain, getCaptain, logoutCaptain };