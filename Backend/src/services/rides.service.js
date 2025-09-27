const Ride = require("../models/ride.model");
const { getTimeAndDistance } = require("./maps.service");
const crypto = require("crypto");


function generateOTP(digits = 6) {
    const otp = crypto.randomInt(0, Math.pow(10, digits))
        .toString()
        .padStart(digits, "0");
    return otp;
}

const getFare = function (time, distance) {


    console.log("time and distance -> ", time, distance);

    const baseFair = {
        auto: 30,
        bike: 20,
        car: 50,
    }
    const perKmRate = {
        auto: 10,
        bike: 8,
        car: 15,
    };
    const perMinRate = {
        auto: 2,
        bike: 1.5,
        car: 3,
    };

    const fair = {
        auto: baseFair.auto + (distance / 1000) * perKmRate.auto + (time / 60) * perMinRate.auto,
        bike: baseFair.bike + (distance / 1000) * perKmRate.bike + (time / 60) * perMinRate.bike,
        car: baseFair.car + (distance / 1000) * perKmRate.car + (time / 60) * perMinRate.car,
    }

    console.log(fair)
    return fair;
}



const createRideService = async (userID, pickup, destination, vehicleType) => {
    console.log("userID, pickup, destination, vehicleType", userID, pickup, destination, vehicleType)

    if (!userID || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }
    const { duration, distance } = await getTimeAndDistance(pickup, destination)
    const fare = getFare(duration, distance)

    const otp = generateOTP(6) 


    const ride = await Ride.create({
        user: userID,
        pickup,
        destination,
        distance,
        duration,
        fare: fare[vehicleType],
        otp
    })


    return ride;


}

module.exports = {
    createRideService,
    getFare

}

