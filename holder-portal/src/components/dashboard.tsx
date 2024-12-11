import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("balance");

  // Placeholder data
  const holderAccount = {
    accountId: "0.0.123456",
    balance: 10000, // in HBAR
    tokens: [
      {
        name: "Token One",
        symbol: "TOK1",
        id: "0.0.111",
        balance: 250,
        logo: "https://via.placeholder.com/48",
      },
      {
        name: "Token Two",
        symbol: "TOK2",
        id: "0.0.112",
        balance: 400,
        logo: "https://via.placeholder.com/48",
      },
      {
        name: "Token Three",
        symbol: "TOK3",
        id: "0.0.113",
        balance: 123,
        logo: "https://via.placeholder.com/48",
      },
    ],
  };

  return (
    <div className="flex bg-blue-200 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Dashboard
          </h2>

          {/* Tabs */}
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
              className="pl-5 flex flex-wrap -mb-px text-sm font-medium text-center"
              role="tablist"
            >
              <li className="mr-2">
                <button
                  className={`text-xl inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "balance"
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("balance")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "balance"}
                >
                  Balance
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`text-xl inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "tokens"
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("tokens")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "tokens"}
                >
                  Token Details
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          <div className="my-12">
            <h4 className="text-blue-800 text-3xl font-bold">
              Digital Security Details
            </h4>
          </div>
          <div>
            {activeTab === "balance" && (
              <div className="relative w-full max-w-lg mx-auto mt-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 text-white p-8 rounded-lg shadow-lg flex flex-col items-center space-y-6">
                  <h3 className="text-3xl font-bold text-center">
                    Current Available Balance
                  </h3>

                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-lg font-semibold">
                      <span className="text-xl">Account ID:</span>{" "}
                      {holderAccount.accountId}
                    </p>

                    <hr className="border-white my-4 w-full" />

                    {/* Token Value Section */}
                    <div className="flex flex-col items-center">
                      <div className="text-6xl font-bold">
                        100
                        <span className="text-sm font-normal"> ATS</span>
                      </div>

                      <p className="text-lg font-semibold mt-4">
                        <span className="text-xl">Value:</span> $1,00,00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transfer Button - Positioned outside the card */}
                <button
                  className="absolute bottom-6 right-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition"
                  // onClick={() => handleTransfer()}
                >
                  Transfer
                </button>
              </div>
            )}

            {activeTab === "tokens" && (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {holderAccount.tokens.map((token, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-tr from-blue-600 to-cyan-400 text-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4"
                  >
                    {/* Token Logo and Symbol side by side */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={token.logo}
                        alt={token.symbol}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                      />
                      <h4 className="text-2xl font-bold">{token.symbol}</h4>
                    </div>

                    {/* Token Details */}
                    <div className="text-center">
                      <p className="text-lg mt-2">
                        <span className="font-semibold">Token Name:</span>{" "}
                        {token.name}
                      </p>
                      <hr className="border-white my-2" />
                      <p className="text-lg mt-2">
                        <span className="font-semibold">Balance:</span>{" "}
                        {token.balance}
                      </p>
                      <hr className="border-white my-2" />
                      <p className="text-lg mt-2">
                        <span className="font-semibold">Token ID:</span>{" "}
                        {token.id}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
