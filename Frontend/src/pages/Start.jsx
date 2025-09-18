import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import startVideo from '../assets/startVideo.mp4'

const Start = () => {

    
    return (
        <div className='w-full h-screen'>
            <div className='flex flex-col justify-between h-full'>
                <div className='relative h-[80%] '>

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={startVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className='absolute bg-tranparent inset-0 p-3'>
                        <div className='flex justify-end text-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="64" viewBox="0 0 20 64">
                                <text x="16" y="44"
                                    fontFamily="Space Grotesk Frontify,Uber Move, Helvetica Neue, Arial, sans-serif"
                                    fontSize="29"
                                    fontWeight="700"
                                    fill="black"
                                    letterSpacing="0">
                                    Uber
                                </text>
                            </svg>

                        </div>


                    </div>
                </div>

                <div className='pb-7 py-4 px-4'>
                    <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                    <Link
                        to="/login"
                        className='w-full flex justify-center py-3 rounded mt-5 bg-black text-white text-xl font-semibold'
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Start
