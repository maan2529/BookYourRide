const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    user: { // set at time of confirm ride 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',

    },
    pickup: {   // set at time of confirm ride
        type: String,
        required: true,
    },
    destination: {  // set at time of confirm ride
        type: String,
        required: true,
    },


    distance: {  // set at time of confirm ride
        type: Number,
        // required: true,
    }, // in meters
    duration: {  // set at time of confirm ride
        type: Number,
    }, // in sec
    fare: {  // set at time of confirm ride
        type: Number,

    },
    status: {
        type: String,
        ennum: ["pending", "completed", "ongoing", "cancelled", "accepted"],
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
        minlength: 6,
        maxlength: 6,
        match: /^\d{6}$/,
        select: false
    }


})

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride