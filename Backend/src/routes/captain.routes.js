const express = require('express')
const captainRouter = express.Router()
const { body } = require('express-validator')
const { registerCaptain, loginCaptain, logoutCaptain, getCaptain } = require('../controllers/captain.controllers.js');
const { authCaptain } = require('../middlewares/authUser.js');

captainRouter.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("fullname.firstname").isLength({ min: 2 }).withMessage("Firstname is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
        body('vehicle.plate').isLength({ min: 4 }).withMessage('plate num must be atleast 4 char'),
        body('vehicle.capacity').isInt({ min: 2 }).withMessage('vehicle capacity atleast 2'),
        body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')

    ],
    registerCaptain
);
captainRouter.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    ],
    loginCaptain
);
captainRouter.get("/get-captain", authCaptain, getCaptain)
captainRouter.get("/logout", authCaptain, logoutCaptain)

module.exports = captainRouter