import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useUserSignup } from '../hooks/authHook.hooks';

const UserSignup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate()
  const mutation = useUserSignup()

  const onSubmit = async (data) => {
  
    try {
      const response = await mutation.mutateAsync(data)
      

      localStorage.setItem("token", response?.data?.token)

      reset()
      // navigate("/Home")
    } catch (error) {
      console.log("Error", error)
    }

  };

  return (
    <div className='h-screen flex flex-col justify-between py-4 px-6 
                    md:min-h-screen md:justify-center md:items-center md:px-8 lg:px-12 xl:px-16 
                    '>

      <div className='md:w-full md:max-w-md lg:max-w-2xl xl:max-w-3xl 
                      bg-white md:shadow-lg md:rounded-2xl md:p-10 lg:p-12 xl:p-14 
                      transition-all duration-300 flex flex-col gap-2'>

        {/* Logo */}
        <svg
          className='w-[25vw] mt-3 md:w-32 lg:w-40 xl:w-44 md:mx-auto'
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

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-start gap-4 w-full max-w-sm text-lg md:max-w-md md:mx-auto lg:max-w-lg xl:max-w-xl"
        >
          <h3 className="text-2xl font-semibold md:text-3xl lg:text-4xl md:text-center md:w-full">
            Create User Account
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
          <div className="flex flex-col w-full gap-2">
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
          <div className="flex flex-col w-full gap-2">
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
        <div className='md:text-center mt-2'>
          <p className="text-sm text-gray-600 md:text-base">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 font-medium hover:underline"
            >
              Login In here
            </Link>
          </p>
        </div>

        {/* create error */}
        <div>
          
          {mutation.isPending ?
            <div>Pending...</div> :
            <>
              {mutation.isError ? (
                <div className='text-red-600'> {mutation.error.response.data.message || "Login failed"}
                  {/* {reset()} */}
                </div>
              ) : null}

              {mutation.isSuccess ? <div className='text-green-600 font-semibold'>Login successfully</div> : null}


            </>
          }
        </div>
      </div>

    </div>
  )
}

export default UserSignup












