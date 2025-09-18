import 'remixicon/fonts/remixicon.css'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationSearchPannel from '../Components/LocationSearchPannel'
import VehiclePanel from '../Components/VehiclePanel'
import ConfirmRide from '../Components/ConfirmRide'
import LookingForDriver from '../Components/LookingForDriver'
import WaitingForDriver from '../Components/WaitingForDriver'
const Home = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const arrowDiv = useRef(null)
    const pannelClose = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)

    const [isLocationPannelOpen, setIsLocationPannelOpen] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)


    const onSubmit = (data) => {

        console.log('Form data:', data)
        // reset()
    }

    useGSAP(() => {
        const cxt = gsap.context(() => {

            if (isLocationPannelOpen) {
                gsap.to(arrowDiv.current, {
                    opacity: 1,

                })
                gsap.from(arrowDiv.current, {
                    rotate: 180,
                    duration: 0.5
                })
                gsap.to(pannelClose.current, {
                    height: '70%'
                })
            } else {
                gsap.to(arrowDiv.current, {
                    opacity: 0,
                })
                gsap.from(arrowDiv.current, {
                    rotate: 180,
                    duration: 0.5
                })
                gsap.to(pannelClose.current, {
                    height: '0%'
                })
            }
        })

        return () => cxt.revert()
    }, [isLocationPannelOpen])

    useGSAP(() => {
        const ctx = gsap.context(() => {
            if (vehiclePanel) {
                gsap.to(vehiclePanelRef.current, {
                    transform: 'translateY(0%)'

                })
            } else {
                gsap.to(vehiclePanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        })
        return () => ctx.revert()

    }, [vehiclePanel])

    useGSAP(() => {
        const ctx = gsap.context(() => {

            if (confirmRidePanel) {
                gsap.to(confirmRidePanelRef.current, {
                    transform: 'translateY(0%)'

                })
            } else {
                gsap.to(confirmRidePanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        })
        return () => ctx.revert()

    }, [confirmRidePanel])
    useGSAP(() => {
        const ctx = gsap.context(() => {

            if (vehicleFound) {
                gsap.to(vehicleFoundRef.current, {
                    transform: 'translateY(0%)'

                })
            } else {
                gsap.to(vehicleFoundRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        })
        return () => ctx.revert()

    }, [vehicleFound])
    useGSAP(() => {
        const ctx = gsap.context(() => {

            if (waitingForDriver) {
                gsap.to(waitingForDriverRef.current, {
                    transform: 'translateY(0%)'

                })
            } else {
                gsap.to(waitingForDriverRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        })
        return () => ctx.revert()

    }, [waitingForDriver])

    return (
        <div className='h-screen relative overflow-hidden '>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

            <img className='w-full h-full' src="https://imgs.search.brave.com/ElorrC3WUa9D6Iqs_Dq74skjEmUuZhVW8YAcYMGpuA0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzI4LzMwLzI2/LzM2MF9GXzcyODMw/MjYyMF9YZGRuZjVD/bDBLMUFDWnVyZDZ5/QnlVekhpSE1NSW9l/Ni5qcGc" alt="" />
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
                {/* location window */}
                <div onClick={() => setIsLocationPannelOpen(true)} className={`h-[35%] p-6 bg-white relative `}>
                    <h5 ref={arrowDiv} onClick={(e) => { e.stopPropagation(); setIsLocationPannelOpen(false) }} className='absolute top-6 right-6 opacity-0 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={handleSubmit(onSubmit)}>
                        <div className="line absolute h-16 w-1 top-[38%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            {...register('pickup', {
                                required: 'Pickup location is required',
                                minLength: {
                                    value: 3,
                                    message: 'Pickup location must be at least 3 characters'
                                }
                            })}

                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        {errors.pickup && (
                            <span className="text-sm text-red-500 mt-1 block">{errors.pickup.message}</span>
                        )}
                        <input
                            {...register('destination', {
                                required: 'Destination is required',
                                minLength: {
                                    value: 3,
                                    message: 'Destination must be at least 3 characters'
                                }
                            })}


                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination'
                        />
                        {errors.destination && (
                            <span className="text-sm text-red-500 mt-1 block">{errors.destination.message}</span>
                        )}
                        <button
                            type='submit'
                            className='bg-black text-white px-4 py-2 rounded-lg mt-4 w-full'>
                            Find Trip
                        </button>
                    </form>


                </div>
                <div ref={pannelClose} className='w-full  bg-white p-3'>
                    <LocationSearchPannel setIsLocationPannelOpen={setIsLocationPannelOpen} setVehiclePanel={setVehiclePanel} />
                </div>

            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />

            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide

                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound} />
            </div>

            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver
                    setVehicleFound={setVehicleFound} />
            </div>

            <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
                <WaitingForDriver

                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>

        </div >
    )
}

export default Home