const { getAddressCoordinate, getTimeAndDistance } = require('../services/maps.service')
const { validationResult } = require('express-validator')

const getCoordinates = async function (req, res) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { address } = req.query

    try {
        const coordinates = await getAddressCoordinate(address)
        res.status(200).json({
            message: "coordinates",
            data: coordinates
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }


    return
}

const getDistanceTime = async (req, res) => {

    const { origin, destination } = req.query

    const timeAndDateValue = await getTimeAndDistance(origin, destination)

    res.status(200).send({
        message: "distance and time ",
        data: timeAndDateValue
    })
    return

}

const getSuggestion = async (req, res) => {
    req.query
}

module.exports = { getCoordinates, getDistanceTime, getSuggestion };