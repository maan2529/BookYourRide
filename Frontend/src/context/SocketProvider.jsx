import React, { createContext, useMemo, useEffect } from "react";
import { io } from "socket.io-client";

export const socketContext = createContext();

const SocketProvider = ({ children }) => {
    // Create socket once
    const socket = useMemo(
        () =>
            io(import.meta.env.VITE_API_URL, {
                withCredentials: true,

            }),
        []
    );

    // Disconnect on unmount
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected")
        })
        socket.on("disconnect", () => {
            console.log("socket connected")
        })
        socket.on("error", (err) => {
            console.log("socket error" + err.message)
        })

    }, []);
    const setMessage = function (eventName, message) {
        socket.emit(eventName, message)
    }
    const resiveMessage = function (eventName, callback) {
        socket.on(eventName, callback)
    }
    const updateCaptainLocation = function (eventName, data) {
        console.log("Emitting:", eventName, data);
        socket.emit(eventName, data);
    };


    return (
        <socketContext.Provider value={{ setMessage, resiveMessage, updateCaptainLocation, socket }}>
            {children}
        </socketContext.Provider>
    );
};

export default SocketProvider;
