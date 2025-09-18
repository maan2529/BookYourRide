

import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCaptainSignup } from '../hooks/authHook.hooks';

const Captainsignup = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const mutation = useCaptainSignup()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log("Form Submitted:", data);
        try {
            const response = await mutation.mutateAsync(data);
            if (response.token) {
                localStorage.setItem('token', response.token)

                reset()
                navigate('/captain-home')

            }
        } catch (error) {
            console.error(error)
        }

        // signup API call here
    };

    return (
        <div className='h-screen flex flex-col justify-between py-1 px-6 
                    md:min-h-screen md:justify-center md:items-center md:px-8 lg:px-12 xl:px-16 
                    '>

            <div className='md:w-full md:max-w-md lg:max-w-2xl xl:max-w-3xl 
                      bg-white md:shadow-lg md:rounded-2xl md:p-10 lg:p-12 xl:p-14 
                      transition-all duration-300 flex flex-col '>

                {/* Logo */}
                <svg
                    className='w-[25vw] md:w-32 lg:w-40 xl:w-44 md:mx-auto'
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 80 64"
                >
                    <text
                        x="0"
                        y="44"
                        fontFamily="Space Grotesk Frontify, Uber Move, Helvetica Neue, Arial, sans-serif"
                        fontSize="35"
                        fontWeight="700"
                        fill="black"
                    >
                        Uber
                    </text>
                </svg>

                {/* create error */}
                <div>
                    {mutation.isPending ?
                        <div>Pending...</div> :
                        <>
                            {mutation.isError ? (
                                <div className='text-red-600 font-semibold '> {mutation.error.response.data.message || "Login failed"} </div>
                            ) : null}

                            {mutation.isSuccess ? <div>Login successfully</div> : null}


                        </>
                    }
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-start items-start gap-2 w-full max-w-sm text-lg md:max-w-md md:mx-auto lg:max-w-lg xl:max-w-xl"
                >
                    <h3 className="text-2xl font-semibold md:text-3xl lg:text-4xl md:text-center md:w-full">
                        Create Captain Account
                    </h3>

                    {/* First Name and Last Name in Single Row */}
                    <div className="flex w-full gap-3">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="firstName" className="text-gray-700 md:text-lg lg:text-xl">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="John"
                                className={`border rounded-lg px-3 py-2 w-full bg-gray-200 focus:outline-none focus:ring-2 
                           md:px-4 md:py-3 lg:px-5 lg:py-4 md:text-lg lg:text-xl
                           ${errors.firstName
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-black"
                                    }`}
                                {...register("firstname", {
                                    required: "First name is required",
                                    minLength: {
                                        value: 2,
                                        message: "First name must be at least 2 characters",
                                    },
                                })}
                                aria-invalid={errors.firstName ? "true" : "false"}
                            />
                            {errors.firstName && (
                                <span className="text-sm text-red-500 md:text-base">{errors.firstName.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="lastName" className="text-gray-700 md:text-lg lg:text-xl">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Doe"
                                className={`border rounded-lg px-3 py-2 w-full bg-gray-200 focus:outline-none focus:ring-2 
                           md:px-4 md:py-3 lg:px-5 lg:py-4 md:text-lg lg:text-xl
                           ${errors.lastName
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-black"
                                    }`}
                                {...register("lastname", {
                                    required: "Last name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Last name must be at least 2 characters",
                                    },
                                })}
                                aria-invalid={errors.lastName ? "true" : "false"}
                            />
                            {errors.lastName && (
                                <span className="text-sm text-red-500 md:text-base">{errors.lastName.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-gray-700 md:text-lg lg:text-xl">
                            What's your Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            className={`border rounded-lg px-3 py-2 w-full bg-gray-200 focus:outline-none focus:ring-2 
                         md:px-4 md:py-3 lg:px-5 lg:py-4 md:text-lg lg:text-xl
                         ${errors.email
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-black"
                                }`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500 md:text-base">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col w-full gap-1  ">
                        <label htmlFor="password" className="text-gray-700 md:text-lg lg:text-xl">
                            Create Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            className={`border rounded-lg px-3 py-2 w-full bg-gray-200 focus:outline-none focus:ring-2 
                         md:px-4 md:py-3 lg:px-5 lg:py-4 md:text-lg lg:text-xl
                         ${errors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-black"
                                }`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && (
                            <span className="text-sm text-red-500 md:text-base">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Vehicle Information - First Row */}
                    <div className="flex w-full gap-3">
                        <div className="flex flex-col w-1/2 gap-1">
                            <label htmlFor="color" className="text-gray-700 md:text-lg lg:text-xl">
                                Vehicle Color
                            </label>
                            <input
                                id="color"
                                type="text"
                                placeholder="White"
                                className={`border rounded-lg px-3 py-2 w-full bg-gray-200 focus:outline-none focus:ring-2 
                           md:px-4 md:py-3 lg:px-5 lg:py-4 md:text-lg lg:text-xl
                           ${errors.color
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-black"
                                    }`}
                                {...register("color", {
                                    required: "Vehicle color is required",
                                    minLength: {
                                        value: 3,
                                        message: "Color must be at least 3 characters",
                                    },
                                })}
                                aria-invalid={errors.color ? "true" : "false"}
                            />
                            {errors.color && (
                                <span className="text-sm text-red-500 md:text-base">{errors.color.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col w-1/2 gap-1">
                            <label htmlFor="plate" className="text-gray-700 md:text-lg lg:text-xl">
                                License Plate
                            </label>
                            <input
                                id="plate"
                                type="text"
                                placeholder="MP09AB1234"
                                className={`border rounded-lg px-3 py-2 w-full bg-gray-200 focus:outline-none focus:ring-2 
                           md:px-4 md:py-3 lg:px-5 lg:py-4 md:text-lg lg:text-xl
                           ${errors.plate
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-black"
                                    }`}
                                {...register("plate", {
                                    required: "License plate is required",
                                    pattern: {
                                        value: /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/,
                                        message: "Enter a valid license plate format (e.g., MP09AB1234)",
                                    },
                                })}
                                aria-invalid={errors.plate ? "true" : "false"}
                            />
                            {errors.plate && (
                                <span className="text-sm text-red-500 md:text-base">{errors.plate.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Vehicle Information - Second Row */}
                    <div className="flex w-full gap-3">
                        <div className="flex flex-col w-1/2 gap-1">
                            <label htmlFor="capacity" className="text-gray-700 md:text-lg lg:text-xl">
                                Capacity
                            </label>
                            <input
                                id="capacity"
                                type="number"
                                placeholder="4"
                                min="1"
                                max="8"
                                className={`border rounded-lg px-3 py-2 w-full bg-gray-200 focus:outline-none focus:ring-2 
                           md:px-4 md:py-3 lg:px-5 lg:py-4 md:text-lg lg:text-xl
                           ${errors.capacity
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-black"
                                    }`}
                                {...register("capacity", {
                                    required: "Vehicle capacity is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Capacity must be at least 1",
                                    },
                                    max: {
                                        value: 8,
                                        message: "Capacity cannot exceed 8",
                                    },
                                })}
                                aria-invalid={errors.capacity ? "true" : "false"}
                            />
                            {errors.capacity && (
                                <span className="text-sm text-red-500 md:text-base">{errors.capacity.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col w-1/2 gap-1">
                            <label htmlFor="vehicleType" className="text-gray-700 md:text-lg lg:text-xl">
                                Vehicle Type
                            </label>
                            <select
                                id="vehicleType"
                                className={`border rounded-lg px-3 py-2 w-full bg-gray-200 focus:outline-none focus:ring-2 
                           md:px-4 md:py-3 lg:px-5 lg:py-4 md:text-lg lg:text-xl
                           ${errors.vehicleType
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-black"
                                    }`}
                                {...register("vehicleType", {
                                    required: "Vehicle type is required",
                                })}
                                aria-invalid={errors.vehicleType ? "true" : "false"}
                            >
                                <option value="">Select Vehicle Type</option>
                                <option value="car">Car</option>
                                <option value="motorcycle">Motorcycle</option>
                                <option value="auto">Auto Rickshaw</option>
                            </select>
                            {errors.vehicleType && (
                                <span className="text-sm text-red-500 md:text-base">{errors.vehicleType.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-5 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed md:py-3 lg:py-4 md:text-lg lg:text-xl"
                    >
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Login Link */}
                <div className='md:text-center mt-3'>
                    <p className="text-sm text-gray-600 md:text-base">
                        Already have an account?{" "}
                        <Link
                            to={"/captain-login"}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login in here
                        </Link>
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Captainsignup