const { validationResult } = require('express-validator');
const userModel = require('../models/user.model.js');
const BlacklistTokenModel = require('../models/blacklistToken.models.js')



const option = {
    httpOnly: true,
    secret: false
}
const registerUser = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;
        const firstname = fullname?.firstname;
        const lastname = fullname?.lastname;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered with this email"
            });
        }


        const user = await userModel.create({
            firstname,
            lastname,
            email,
            password
        });


        const token = user.generateAuthToken();
        res.cookie("token", token, option)
        res.status(201).json({ token, user });
    } catch (error) {
        console.error("some error in registerUser:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
const loginUser = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;


        const User = await userModel.findOne({ email }).select("+password");
        if (!User) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatchPassword = await User.comparePassword(password)

        if (!isMatchPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = User.generateAuthToken();

        res.cookie("token", token, option)
        const userReturn = await userModel.findOne({ email }).select('-password')

        res.status(201).json({ token, userReturn });
    } catch (error) {
        console.error("some error in user login:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

const getUser = async function (req, res) {
    const user = req.user;

    res.status(201).json({
        message: "user data",
        data: user
    })
}
const logoutUser = async function (req, res) {


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
            message: "logouted sccessfully"
        })

    } catch (error) {
        throw new error("error at logout " + error)
    }
} 



module.exports = { registerUser, loginUser, getUser, logoutUser };