const { createRideService } = require("../services/rides.service");

const createRide = async (req, res) => {
    const { pickup, destination, vahicleType } = req.body;
    const userID = req?.user?.id;

    try {
        const rideCreated = await createRideService(userID, pickup, destination, vahicleType);

        return res.status(500).json({
            message: "ride created successfully",
            success: true,
            data: rideCreated,
        })
    } catch (error) {
        return res.status(500).json({
            message: "ride creation failed",
            error: error.message
        })
    }
}

module.exports = {
    createRide
}