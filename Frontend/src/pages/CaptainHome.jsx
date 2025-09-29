import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RidePopUp from '../Components/RidePopUp'
import ConfirmRidePopUp from './ConfirmRidePopUp'
import { myContext } from '../context/MyContextComponent'
import { useCaptainDetail } from "../hooks/captainHook"
import { useEffect } from 'react'
import { socketContext } from '../context/SocketProvider'
const CaptainHome = () => {

    const confirmRidePopupPanelRef = useRef(null)
    const ridePopupPanelRef = useRef(null)

    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const { setCaptain, captain, ride } = useContext(myContext)
    const mutation = useCaptainDetail()
    const { setMessage, resiveMessage, updateCaptainLocation, socket, rideDetails } = useContext(socketContext)

    function updateLocation() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition((position) =>
                // console.log(position)
                socket.emit("update-captain-location", {
                    captainId: captain?._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                })

            );

    }

    async function confirmRide() {
        console.log("confirmRide")

        // try {
        //     if (ride) {
        //         console.log(ride)
        //         await instance.post('/ride/confirm', ride?._id)
        //     }
        // } catch (error) {
        //     throw Error(error)
        // }
    }


    useEffect(() => {
        if (!captain) return;
        const interval = setInterval(updateLocation, 10000);

        setMessage("join", { userType: "captain", userId: captain?._id });

        return () => clearInterval(interval);
    }, [captain]);

    useEffect(() => {  // to open captain popup page
        if (!rideDetails) return
        console.log(rideDetails)
        setRidePopupPanel(true)
    }, [rideDetails])


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])


    if (mutation.isPending) {
        return <div>Loading</div>
    }
    if (mutation.error) {
        return console.error(mutation.error.message)
    }
    if (mutation.data) {
        setCaptain(mutation?.data?.data?.data)
        console.log(mutation.data.data.data)
    }

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    rideDetails={rideDetails}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}

                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    rideDetails={rideDetails}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}
                    
                />
            </div>
        </div>
    )
}

export default CaptainHome