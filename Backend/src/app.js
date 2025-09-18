const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes.js')
const captainRouter = require('./routes/captain.routes.js')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const cors = require('cors')

const mapRouter = require('./routes/map.route.js')
const rideRouter = require('./routes/ride.routes.js')

app.use(cors());
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/user', userRouter)
app.use('/api/captains', captainRouter)
app.use('/api/maps', mapRouter)
app.use('/api/ride', rideRouter)
module.exports = app 