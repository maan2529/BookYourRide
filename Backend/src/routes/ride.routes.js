const express = require('express');
const { expressValidator, body } = require('express-validator');
const { createRide, getFairAmount } = require('../controllers/ride.controllers');
const { authUser } = require('../middlewares/authUser');
const rideRouter = express.Router();

rideRouter.post('/create',
    body('pickup')
        .notEmpty()
        .withMessage("pickup location must not be empty")
        .isString()
        .withMessage('pickup must be a string'),
    body('destination')
        .notEmpty()
        .withMessage("destination location must not be empty")
        .isString()
        .withMessage('destination must be a string'),
    body('vehicleType')
        .notEmpty()
        .withMessage("vehicle field must not be empty")
        .isString()
        .withMessage('vehicle must be a string')
        .isIn(['car', 'auto', 'bike']),

    authUser,
    createRide
)

rideRouter.post('/get-fair', [
    body('pickup')
        .notEmpty()
        .withMessage("pickup location must not be empty")
        .isString()
        .withMessage('pickup must be a string'),
    body('destination')
        .notEmpty()
        .withMessage("destination location must not be empty")
        .isString()
        .withMessage('destination must be a string'),
], authUser, getFairAmount)

module.exports = rideRouter;