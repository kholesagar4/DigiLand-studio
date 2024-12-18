import { useState } from "react";

const Login = () => {
  const [accountId, setAccountId] = useState("");

  const handleAccountIdChange = (e: any) => {
    const value = e.target.value;
    setAccountId(value);
    localStorage.setItem('accountId', value);
  };
  
  const handleLogin = () => {
    if (accountId) {
      window.location.href = "/dashboard";
    } else {
      alert("Incorrect information entered");
    }
  };

  return (
    <section className="min-h-screen gradient-form h-full bg-gradient-to-b from-green-200 via-green-100 to-beige-50">
      <div className="flex items-center justify-center h-full p-30">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12 bg-white">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="/land-logo.jpg"
                        alt="Land Logo"
                      />
                    </div>

                    <form>
                      <p className="mb-4 text-green-800">
                        Please login to your account
                      </p>

                      <div
                        className="relative mb-4"
                        data-twe-input-wrapper-init
                      >
                        <label
                          htmlFor="accountId"
                          className="block mb-2 text-green-500"
                          id="accountId"
                        >
                          Account Id
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded border border-green-300 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 focus:border-green-500 focus:ring focus:ring-green-200 dark:text-white"
                          id="accountId"
                          placeholder="Enter your account Id"
                          value={accountId}
                          required
                          onChange={handleAccountIdChange}
                        />
                      </div>

                      <div
                        className="relative mb-8"
                        data-twe-input-wrapper-init
                      >
                        <label
                          htmlFor="password"
                          className="block mb-2 text-green-500"
                          id="password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="block w-full rounded border border-green-300 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 focus:border-green-500 focus:ring focus:ring-green-200 dark:text-white"
                          id="password"
                          placeholder="Enter your password"
                        />
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="w-full rounded bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:from-green-600 hover:to-green-700 focus:shadow-md"
                          type="button"
                          onClick={() => handleLogin()}
                        >
                          Log in
                        </button>
                        <a
                          href="#!"
                          className="mt-3 inline-block text-sm text-green-600 hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0">Don't have an account?</p>
                        <button
                          type="button"
                          className="rounded border-2 border-green-500 px-6 py-1 text-xs font-medium uppercase text-green-600 transition duration-150 hover:border-green-600 hover:bg-green-50 hover:text-green-700"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none bg-cover bg-center bg-[url('land-login.svg')]">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12 ">
                    <h4 className="mb-6 text-xl font-semibold text-green-100">
                      Connecting You to the Land
                    </h4>
                    <p className="text-sm text-green-200">
                      Embrace the beauty of nature and explore solutions that
                      protect and enhance our connection to the land.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
