const express = require('express')
const userRouter = express.Router()
const { body } = require('express-validator')
const { registerUser, loginUser, getUser, logoutUser } = require('../controllers/user.controllers.js')
const {authUser} = require("../middlewares/authUser.js")

userRouter.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("fullname.firstname").isLength({ min: 2 }).withMessage("Firstname is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    ],
    registerUser
);
userRouter.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    ],
    loginUser
);
userRouter.get("/get-user", authUser, getUser)
userRouter.get("/logout", authUser, logoutUser)

module.exports = userRouter;