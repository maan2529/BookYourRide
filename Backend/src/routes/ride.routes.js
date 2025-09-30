const express = require('express');
const { expressValidator, body } = require('express-validator');
const { createRide, getFairAmount, confirmRide, rideStart, rideCancel, finishRide } = require('../controllers/ride.controllers');
const { authUser, authCaptain } = require('../middlewares/authUser');
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

rideRouter.post('/confirm', authCaptain, [
    body('rideId').isMongoId().withMessage("invalid mongo id"),

], confirmRide)
rideRouter.post('/start-ride', authCaptain, [
    body('otp').isString().withMessage("OTP require"),
    body('rideId').isMongoId().withMessage("invalid mongo id"),

], rideStart)
rideRouter.post('/cancel-ride', authCaptain, [
    body('otp').isString().withMessage("OTP require"),
    body('rideId').isMongoId().withMessage("invalid mongo id"),

], rideCancel)
rideRouter.post('/finish-ride', authCaptain, [
    body('rideId').isMongoId().withMessage("invalid mongo id"),

], finishRide)

module.exports = rideRouter;