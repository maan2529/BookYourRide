const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',

    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        // required: true,
    }, // in meters
    duration: {
        type: Number,
    }, // in sec
    fare: {
        type: Number,

    },
    status: {
        type: String,
        ennum: ["pending", "completed", "ongoing", "cancelled", "cancelled"],
        default: "pending"
    },
    paymentID: {
        type: String,
    },
    orderID: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        required: true,
        length: 6
    }

})

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride