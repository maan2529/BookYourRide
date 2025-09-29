import React, { createContext, useState } from 'react'

export const myContext = createContext();

const MyContextComponent = ({ children }) => {

    const [fare, setFare] = useState(null)
    const [pickupAndDestination, setPickupAndDestination] = useState(null)
    const [ride, setRide] = useState(null)
    const [captain, setCaptain] = useState(null)
    const [user, setUser] = useState(null)
    const [confirmRide, setConfirmRide] = useState(null)


    return (

        <myContext.Provider value={{ user, setUser, fare, setFare, pickupAndDestination, setPickupAndDestination, ride, setRide, captain, setCaptain, confirmRide, setConfirmRide }}>
            {children}
        </myContext.Provider >

    )
}

export default MyContextComponent