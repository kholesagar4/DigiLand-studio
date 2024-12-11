import React from "react";

const LoginForm: React.FC = () => {

  const handleLogin = () => {
    window.location.href = '/dashboard';
  }
  
  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
      <form
        method="POST"
        action="#"
        className="bg-white px-10 py-14 rounded-xl w-screen shadow-2xl max-w-xl transform transition-all duration-500 hover:scale-105"
      >
        <div className="space-y-6">
          <h1 className="text-center text-4xl font-extrabold text-blue-800 mb-8 animate-fadeIn">
            Welcome Back!
          </h1>

          <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4 group transition-all duration-300 focus-within:border-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400 group-focus-within:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none focus:outline-none border-none w-full text-gray-700 focus:ring-2 focus:ring-white"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4 group transition-all duration-300 focus-within:border-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none focus:outline-none border-none w-full text-gray-700 focus:ring-2 focus:ring-white"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex justify-center items-center mt-4">
          <label
            htmlFor="rememberMeCheckbox"
            className="inline-flex items-center text-gray-700 font-medium text-sm"
          >
            <input
              type="checkbox"
              id="rememberMeCheckbox"
              name="rememberMe"
              className="mr-2 accent-blue-600"
            />
            <span className="font-semibold">Remember me?</span>
          </label>
        </div>

        {/* Login Button */}
        <button
        onClick={handleLogin}
          type="submit"
          className="mt-8 w-full shadow-lg bg-gradient-to-tr from-blue-600 to-red-400 hover:from-blue-700 hover:to-red-600 text-white py-3 rounded-lg text-lg font-bold tracking-wide transition-transform duration-300 transform hover:scale-105"
        >
          Login
        </button>

        <div className="mt-6 flex justify-center items-center">
          <p className="text-gray-600 font-medium text-sm">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 font-semibold hover:underline">
              Register Now &rarr;
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
