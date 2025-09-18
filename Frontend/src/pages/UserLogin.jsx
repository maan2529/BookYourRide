import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useUserLogin } from '../hooks/authHook.hooks.js'

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate()
  const mutation = useUserLogin()

  const onSubmit = async (data) => {
    try {
      const result = await mutation.mutateAsync(data)
      // console.log(result)
      localStorage.setItem('token', result.token)
      reset();
      navigate('/home')

    } catch (error) {
      console.error("Login Error:", error);
    }

  };


  return (
    <div className='h-screen flex flex-col justify-between py-4 px-6 
                    md:min-h-screen md:justify-center md:items-center md:px-8 lg:px-12 xl:px-16 
                    '>


      <div className='md:w-full md:max-w-md lg:max-w-2xl xl:max-w-3xl 
                      bg-white md:shadow-lg md:rounded-2xl md:p-10 lg:p-12 xl:p-14 
                      transition-all duration-300 flex flex-col gap-6'>

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
          className="flex flex-col justify-start items-start gap-4 w-full max-w-sm text-lg 
                     md:max-w-md md:mx-auto lg:max-w-lg xl:max-w-xl"
        >
          <h3 className="text-2xl font-semibold md:text-3xl lg:text-4xl md:text-center md:w-full">
            Welcome to Uber User
          </h3>


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
              Enter Password
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-5 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed md:py-3 lg:py-4 md:text-lg lg:text-xl"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>


        {/* Signup Link */}
        <div className='md:text-center'>
          <p className="text-sm text-gray-600 md:text-base">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* error handling */}
        <div>
          {mutation.isPending ? (
            'Adding data...'
          ) : (
            <>
              {mutation.isError ? (
                <div className='text-red-600'>Error is: {mutation.error?.response?.data?.message || "Login failed"}
            
                </div>
              ) : null}

              {mutation.isSuccess ? <div>Login successfully,{mutation.data}</div> : null}


            </>
          )}
        </div>

        {/* Captain Button (inside box only for md+) */}
        <Link
          to={'/signup'}
          className="hidden md:flex justify-center w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 
                     transition disabled:opacity-50 disabled:cursor-not-allowed 
                     md:py-3 lg:py-4 md:text-lg lg:text-xl"
        >
          Sign in as Captain
        </Link>
      </div>

      {/* Captain Button */}
      <Link
        to={'/captain-login'}

        className="flex justify-center md:hidden w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 
                   transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login in as Captain
      </Link>
    </div>
  )
}

export default UserLogin;
