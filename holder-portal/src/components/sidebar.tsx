import { useEffect, useState } from "react";

const Sidebar = () => {
  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const goToTransactions = () => {
    window.location.href = "/transactions";
  };
  
  const handleSignOut = () => {
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col justify-between h-screen">
      <div>
        <div className="p-4 font-bold text-lg border-b border-green-500">
          Holder Portal
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
            <li>
              <button
                onClick={goToDashboard}
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-500 transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.74723 3H4.7367C3.66302 3 2.77881 3.88421 2.77881 4.95789V8.96842C2.77881 10.0421 3.66302 10.9263 4.7367 10.9263H8.74723C9.82091 10.9263 10.7051 10.0421 10.7051 8.96842V4.98947C10.7367 3.88421 9.85249 3 8.74723 3ZM9.31565 9C9.31565 9.31579 9.06302 9.56842 8.74723 9.56842H4.7367C4.42091 9.56842 4.16828 9.31579 4.16828 9V4.98947C4.16828 4.67368 4.42091 4.42105 4.7367 4.42105H8.74723C9.06302 4.42105 9.31565 4.67368 9.31565 4.98947V9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.2629 3H15.2523C14.1786 3 13.2944 3.88421 13.2944 4.95789V8.96842C13.2944 10.0421 14.1786 10.9263 15.2523 10.9263H19.2629C20.3365 10.9263 21.2207 10.0421 21.2207 8.96842V4.98947C21.2207 3.88421 20.3365 3 19.2629 3ZM19.8313 9C19.8313 9.31579 19.5786 9.56842 19.2629 9.56842H15.2523C14.9365 9.56842 14.6839 9.31579 14.6839 9V4.98947C14.6839 4.67368 14.9365 4.42105 15.2523 4.42105H19.2629C19.5786 4.42105 19.8313 4.67368 19.8313 4.98947V9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8.74723 13.0737H4.7367C3.66302 13.0737 2.77881 13.9579 2.77881 15.0316V19.0422C2.77881 20.1158 3.66302 21 4.7367 21H8.74723C9.82091 21 10.7051 20.1158 10.7051 19.0422V15.0632C10.7367 13.9579 9.85249 13.0737 8.74723 13.0737ZM9.31565 19.0737C9.31565 19.3895 9.06302 19.6422 8.74723 19.6422H4.7367C4.42091 19.6422 4.16828 19.3895 4.16828 19.0737V15.0632C4.16828 14.7474 4.42091 14.4948 4.7367 14.4948H8.74723C9.06302 14.4948 9.31565 14.7474 9.31565 15.0632V19.0737Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.2629 13.0737H15.2523C14.1786 13.0737 13.2944 13.9579 13.2944 15.0316V19.0422C13.2944 20.1158 14.1786 21 15.2523 21H19.2629C20.3365 21 21.2207 20.1158 21.2207 19.0422V15.0632C21.2207 13.9579 20.3365 13.0737 19.2629 13.0737ZM19.8313 19.0737C19.8313 19.3895 19.5786 19.6422 19.2629 19.6422H15.2523C14.9365 19.6422 14.6839 19.3895 14.6839 19.0737V15.0632C14.6839 14.7474 14.9365 14.4948 15.2523 14.4948H19.2629C19.5786 14.4948 19.8313 14.7474 19.8313 15.0632V19.0737Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={goToTransactions}
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-blue-500 transition"
              >
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
                <span>Transactions</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-green-500">
        <button
          onClick={handleSignOut}
          className="flex items-center text-sm text-green-200 hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 12h6m-3-3v6"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
