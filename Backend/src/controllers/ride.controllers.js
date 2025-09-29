const { validationResult } = require("express-validator");
const { getTimeAndDistance, getCaptainsInRadius, getAddressCoordinate } = require("../services/maps.service");
const { createRideService, getFare, confirmPassengerRide } = require("../services/rides.service");
const { sendMessageToSocketId } = require("../socket/socketServer");
const Ride = require("../models/ride.model");
const { io } = require('../socket/socketServer')
const createRide = async (req, res) => {
    const { pickup, destination, vehicleType } = req.body;
    const userID = req?.user?.id;

    try {
        const rideCreated = await createRideService(userID, pickup, destination, vehicleType);
        // console.log({ rideCreated })
        // get its coordinates
        const origin_cordinates = await getAddressCoordinate(pickup);
        const origin_lon = origin_cordinates?.lng
        const origin_lat = origin_cordinates?.lat

        const getAllCaptainInRange = await getCaptainsInRadius(origin_lat, origin_lon, 20000)// change to 2km
        // console.log({ getAllCaptainInRange })

        getAllCaptainInRange.forEach((captain) => {
            sendMessageToSocketId(captain?.socketId, {
                event: "new-ride",
                data: rideCreated
            })
        })

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
    // console.log(pickup, destination)
    try {
        if (!pickup && !destination) {
            return res.status(404).json({
                message: "pickup and destination both require"
            })
        }

        const { duration, distance } = await getTimeAndDistance(pickup, destination)
        console.log("a", duration, distance)
        const fare = getFare(duration, distance)
        console.log("f", fare)



        return res.status(200).json({
            message: "successfully fatched distance and duration",
            data: fare,
            success: true,
        });

    } catch (error) {
        throw Error(error)
    }

}

const confirmRide = async function (req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    }

    const { rideId } = req.body;
    const captain = req.captain;
    console.log("controler->", rideId, captain)
    try {
        const ride = await confirmPassengerRide({ rideId, captain })
        sendMessageToSocketId(ride?.user?.socketId, {
            event: 'ride-confirm',
            data: ride,
        })

        return res.status(200).json(ride)
    } catch (error) {
        throw Error(error);
    }

}


const rideStart = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { otp, rideId } = req.body;

    if (!otp) {
        return res.status(400).json({ message: "OTP required" });
    }
    if (!rideId) {
        return res.status(400).json({ message: "ride is require" });
    }

    try {
        const rideDetail = await Ride.findById(rideId).select("+otp");
        if (!rideDetail) {
            return res.status(404).json({ message: "Ride not found" });
        }

        if (rideDetail.status !== "accepted") {
            throw new Error("ride not accepted")
        }

        // console.log(otp, rideDetail)
        if (rideDetail?.otp?.toString() !== otp) {
            return res.status(400).json({
                message: "Incorrect OTP",
                success: false
            });
        }
        const updatedRideDetail = await Ride.findByIdAndUpdate(rideId, {
            status: "ongoing"
        }, { new: true }).populate('user').populate('captain');

        res.status(200).json({
            message: "OTP matched",
            success: true
        });

        sendMessageToSocketId(updatedRideDetail?.user?.socketId, {
            event: 'ride-start',
            data: updatedRideDetail
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const rideCancel = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { otp, rideId } = req.body;

    // console.log(otp, rideId)

    if (!otp) {
        return res.status(400).json({ message: "OTP required" });
    }
    if (!rideId) {
        return res.status(400).json({ message: "ride is require" });
    }

    try {
        const rideDetail = await Ride.findById(rideId);
        if (!rideDetail) {
            return res.status(404).json({ message: "Ride not found" });
        }

        if (rideDetail.status !== "accepted") {
            throw new Error("ride not accepted")
        }



        const updatedRideDetail = await Ride.findByIdAndUpdate(rideId, {
            status: "cancel"
        });

        sendMessageToSocketId(rideDetail?.user?.socketId, {
            event: 'ride-cancel',
            data: updatedRideDetail
        })


        return res.status(200).json({
            message: "OTP matched",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    createRide,
    getFairAmount,
    confirmRide,
    rideStart,
    rideCancel,
}