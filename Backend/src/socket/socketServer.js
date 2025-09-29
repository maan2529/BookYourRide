const { Server } = require("socket.io");
const User = require("../models/user.model");
const Captain = require("../models/captain.models");

let io;
function socketServer(httpServer) {
    io = new Server(httpServer, {
        cors: {
            // origin: "http://localhost:5173",
            origin: "https://25l1cphr-5173.inc1.devtunnels.ms",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("join", async ({ userType, userId }) => {
            console.log(userId, userType)
            if (userType === "user") {
                const user = await User.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            } else {
                const captain = await Captain.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            }
        })

        socket.on("update-captain-location", async (data) => {
            const { captainId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit("error", { message: "invalid location" })
            }
            // console.log(captainId, location)
            await Captain.findByIdAndUpdate(captainId, {
                location: {
                    ltd: location.ltd,
                    lan: location.lng,
                }
            })

        })
        socket.on("disconnect", (reason) => {
            console.log(" Socket disconnected:", socket.id, "Reason:", reason);
        });


        socket.on("error", (err) => {
            console.error("Socket error:", err);
        });
    });


}

function sendMessageToSocketId(socketId, userObj) {
    if (io) {
        console.log("userObj", { userObj })
        console.log("socketId", { socketId })

        io.to(socketId).emit(userObj.event, userObj.data)
    } else {
        console.log("socket is not initialize");
    }
}

module.exports = { socketServer, io, sendMessageToSocketId };
