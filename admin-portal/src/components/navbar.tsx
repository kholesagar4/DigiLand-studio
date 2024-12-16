import { useEffect, useState } from "react";
import { envConfig } from "../config/envConfig";

const Navbar = () => {
  const [hederaAccountId, setHederaAccountId] = useState<string | null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedInEmail = localStorage.getItem("accountId");
      setHederaAccountId(loggedInEmail);
    }
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-green-600"></h1>
      <div className="flex items-center space-x-10">
        {hederaAccountId && (
          <div className="w-48 h-10 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-green-600 border border-green-300 rounded-lg flex items-center justify-center">
            <svg
              className="h-6 w-6 text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />{" "}
              <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
            </svg>
            <p className="text-sm font-semibold text-white ml-2">
              {hederaAccountId}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border border-green-300"
          />
          <div>
            <p className="text-md font-semibold text-green-600">Admin Portal</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
