import React, { createContext, useMemo, useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

export const socketContext = createContext();

const SocketProvider = ({ children }) => {
    // Create socket once
    const [rideDetails, setRideDetails] = useState(null)
    const [confirmRideDetails, setConfirmRideDetails] = useState(null)
    const [otpMatch, setOTPMatch] = useState(null)
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

    const getRide = () => {
        socket.off('new-ride');

        socket.on('new-ride', (data) => {
            console.log(data);
            setRideDetails(data)
        });
    }

    const confirmRide = () => {
        socket.off('ride-confirm');
        socket.on('ride-confirm', (data) => {
            setConfirmRideDetails(data)
            // console.log(data)
        })
    }
    const otpMatchFun = () => {
        socket.off('ride-start');
        socket.on('ride-start', (data) => {
            setOTPMatch(data)
            console.log(data)
        })
    }



    useEffect(() => {
        getRide();
        confirmRide();
        

        return () => {
            socket.off('new-ride');
        };
    }, []);

    // useEffect(() => {

    //     otpMatchFun()

    //     return () => {
    //         socket.off('ride-start');
    //     };
    // }, []);


    return (
        <socketContext.Provider value={{ setMessage, resiveMessage, updateCaptainLocation, socket, rideDetails, confirmRideDetails, setConfirmRideDetails, otpMatch, setOTPMatch }}>
            {children}
        </socketContext.Provider>
    );
};

export default SocketProvider;
