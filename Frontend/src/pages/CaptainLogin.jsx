import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCaptainLogin, useCaptainSignup } from '../hooks/authHook';

const Captainlogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate()
  const mutation = useCaptainLogin()
  const onSubmit = async (data) => {
    // console.log("Form Submitted:", data);

    const response = await mutation.mutateAsync(data)
    console.log({ response })
    if (response?.token) {
      localStorage.setItem('token', response.token)
      navigate('/captain-home')
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
            Welcome to Uber Captain
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
            className="w-full mt-5 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed  md:py-3 lg:py-4 md:text-lg lg:text-xl"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <div className='md:text-center mt-2'>
          <p className="text-sm text-gray-600 md:text-base">
            Don't have an account?{" "}
            <Link
              to={"/captain-signup"}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* create error */}
        <div>
          {mutation.isPending ?
            <div>Pending...</div> :
            <>
              {mutation.isError ? (
                <div className='text-red-600'> {mutation.error.response.data.message || "Login failed"} </div>
              ) : null}

              {mutation.isSuccess ? <div>Login successfully</div> : null}


            </>
          }
        </div>

        {/* Captain Button (inside box only for md+) */}
        <Link
          to={'/login'}
          className="hidden md:flex justify-center w-full bg-orange-400 text-white py-2 rounded-lg font-medium hover:bg-orange-500 
                     transition disabled:opacity-50 disabled:cursor-not-allowed 
                     md:py-3 lg:py-4 md:text-lg lg:text-xl"
        >
          Sign in as User
        </Link>
      </div>

      {/* Captain Button */}
      <Link
        to={'/login'}

        className="flex justify-center md:hidden w-full bg-orange-400 text-white py-2 rounded-lg font-medium hover:bg-orange-500 
                   transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login in as User
      </Link>
    </div>
  )
}

export default Captainlogin