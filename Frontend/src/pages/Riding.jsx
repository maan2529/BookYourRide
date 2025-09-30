import React from 'react'
import { Link } from 'react-router-dom'
import { socketContext } from '../context/SocketProvider'
import { useContext } from 'react'
import { myContext } from '../context/MyContextComponent'

const Riding = () => {
    const { otpMatch } = useContext(socketContext)
    const { ride } = useContext(myContext)

    console.log('Riding component - otpMatch:', otpMatch);
    console.log('Riding component - ride:', ride);

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='w-full h-full' src="https://imgs.search.brave.com/ElorrC3WUa9D6Iqs_Dq74skjEmUuZhVW8YAcYMGpuA0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzI4LzMwLzI2/LzM2MF9GXzcyODMw/MjYyMF9YZGRuZjVD/bDBLMUFDWnVyZDZ5/QnlVekhpSE1NSW9l/Ni5qcGc" alt="" />
            </div>

            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{otpMatch?.captain?.fullname?.firstname || 'Captain'}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{otpMatch?.captain?.vehicle?.plate || 'Loading...'}</h4>
                        <p className='text-sm text-gray-600'>{otpMatch?.captain?.vehicle?.vehicleType || 'Vehicle'}</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>Destination</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{otpMatch?.destination || ride?.destination || 'Loading...'}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹ {Math.round(otpMatch?.fare || ride?.fare) || 0}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding