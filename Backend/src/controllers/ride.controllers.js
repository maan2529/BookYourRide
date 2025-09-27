const { getTimeAndDistance, getCaptainsInRadius, getAddressCoordinate } = require("../services/maps.service");
const { createRideService, getFare } = require("../services/rides.service");

const createRide = async (req, res) => {
    const { pickup, destination, vehicleType } = req.body;
    const userID = req?.user?.id;

    try {
        const rideCreated = await createRideService(userID, pickup, destination, vehicleType);
        console.log({rideCreated})
        // get its coordinates
        const origin_cordinates = await getAddressCoordinate(pickup);
        const origin_lon = origin_cordinates?.lng
        const origin_lat = origin_cordinates?.lat

        const getCordinates = await getCaptainsInRadius(origin_lat, origin_lon, 200)
        console.log({getCordinates})

        return res.status(200).json({
            message: "ride created successfully",
            success: true,
            data: rideCreated,
        })

    } catch (error) {

        res.status(500).json({
            message: "ride creation failed",
            error: error.message
        })
        throw Error(error)
    }
}

const getFairAmount = async (req, res) => {
    const { pickup, destination } = req.body
    console.log(pickup, destination)
    try {
        if (!pickup && !destination) {
            return res.status(404).json({
                message: "pickup and destination both require"
            })
        }

        const { duration, distance } = await getTimeAndDistance(pickup, destination)
        // console.log("a", duration, distance)
        const fare = getFare(duration, distance)
        // console.log("f", fare)



        return res.status(200).json({
            message: "successfully fatched distance and duration",
            data: fare,
            success: true,
        });

    } catch (error) {
        throw Error(error)
    }

}

module.exports = {
    createRide,
    getFairAmount
}