import React, { useContext, useEffect } from 'react'
import { myContext } from '../context/MyContextComponent'
import { useCreateRide } from '../hooks/locationHooks'

const ConfirmRide = (props) => {
    // const { ride } = useContext(myContext)
    const { confirmRide } = useContext(myContext)
    const mutation = useCreateRide()
    const { setFare, fare, pickupAndDestination, setRide, ride } = useContext(myContext)

    function handleRideBooking() {
        props.setVehicleFound(true)
        props.setConfirmRidePanel(false)

        mutation.mutate(props.vehicleDetail, {
            onSuccess: (data) => {
                setRide(data?.data?.data)
                console.log(data.data.data)
            },
            onError: (err) => {
                console.error(err)
            }
        })
    }


    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {

                return props.setConfirmRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>



            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{confirmRide?.location?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{confirmRide?.location?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{" " + Math.ceil(confirmRide?.fare[props.vehicleDetail?.vehicleType])}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    // props.setVehicleFound(true)
                    // props.setConfirmRidePanel(false)

                    handleRideBooking()
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide