const express = require('express')
const { authUser } = require('../middlewares/authUser')
const mapRouter = express.Router()
const { query } = require('express-validator')
const { getCoordinates, getDistanceTime } = require('../controllers/map.controllers')



mapRouter.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }).withMessage("Min length must be 3")
    , authUser, getCoordinates)

mapRouter.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser, getDistanceTime)

module.exports = mapRouter