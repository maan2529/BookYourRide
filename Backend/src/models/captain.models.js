const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema(
    {
        fullname: {

            firstname: {
                type: String,
                required: [true, "First name is required"],
                trim: true,
                minlength: [2, "First name must be at least 2 characters"],
                maxlength: [50, "First name cannot exceed 50 characters"],
            },
            lastname: {
                type: String,
                trim: true,
                minlength: [2, "Last name must be at least 2 characters"],
                maxlength: [50, "Last name cannot exceed 50 characters"],
            },
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            maxlength: [128, "Password cannot exceed 128 characters"],
            select: false
        },
        socketId: { // user ka location rider  ko diya hai
            type: String,

        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive"
        },
        vehicle: {
            color: {
                type: String,
                // require:true,
            },
            plate: {
                type: String,
                require: true,
                minlength: [3, "min char 3 requre for plate number"],

            },
            capacity: {
                type: Number,
                require: true,
                min: [2, "min 2 capacity"]
            },
            vehicleType: {
                type: String,
                require: true,
                enum: ["car", "motorcycle", "auto"],
            }

        },
        location: {
            lat: {
                type: Number,
            },
            lan: {
                type: Number,
            }
        }
    },
    { timestamps: true }
);

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.pre('save', async function (next) {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10)

    next()
})

const Captain = mongoose.model("Captain", captainSchema);
module.exports = Captain
