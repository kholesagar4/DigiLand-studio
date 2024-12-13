import axios, { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { apiRoutes } from "../config/apiRoutes";
import { envConfig } from "../config/envConfig";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

type Token = {
  admin_key: {
    _type: string;
    key: string;
  };
  metadata: string;
  name: string;
  symbol: string;
  token_id: string;
  type: "NON_FUNGIBLE_UNIQUE" | string;
  decimals: number;
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tokensList, setTokensList] = useState<Token[]>([]);

  const Headers = [
    "Token Id",
    "Token Name",
    "Token Symbol",
    "Token Type",
    "NFTsList",
    "Action",
  ];
  // // Placeholder data
  // const holderAccount = {
  //   accountId: "0.0.123456",
  //   balance: 10000, // in HBAR
  //   tokens: [
  //     {
  //       name: "Token One",
  //       symbol: "TOK1",
  //       id: "0.0.111",
  //       balance: 250,
  //       logo: "https://via.placeholder.com/48",
  //     },
  //     {
  //       name: "Token Two",
  //       symbol: "TOK2",
  //       id: "0.0.112",
  //       balance: 400,
  //       logo: "https://via.placeholder.com/48",
  //     },
  //     {
  //       name: "Token Three",
  //       symbol: "TOK3",
  //       id: "0.0.113",
  //       balance: 123,
  //       logo: "https://via.placeholder.com/48",
  //     },
  //   ],
  // };

  useEffect(() => {
    const getAccountId = localStorage.getItem("accountId");
    handleCreateToken(getAccountId);
  }, []);
  const handleCreateToken = async (accountId: string | null) => {
    setIsLoading(true);
    try {
      const body = {
        "account.id": accountId,
        limit: 2,
        order: "desc",
        type: "NON_FUNGIBLE_UNIQUE",
      };

      const response = await axios.get(
        `${envConfig.PUBLIC_BASE_URL}${apiRoutes.tokens}`,
        { params: body }
      );

      if (!response.data) {
        throw new Error("Error creating token");
      } else if (response?.status === HttpStatusCode.Ok) {
        setTokensList(response?.data?.tokens);
      }
    } catch (error) {
      alert("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const NavigationToScreen = (route: string, token_id: string) => {
    const tokenData = {
      tokenId: token_id,
    };
    // Set the tokenData
    // localStorage.setItem("tokenData", JSON.stringify(tokenData));
    localStorage.setItem("tokenData", token_id);

    // Navigate to the next page
    window.location.href = route;
  };

  return (
    <div className="flex bg-blue-200 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          {/* <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Dashboard
          </h2> */}

          {/* Tabs */}
          {/* <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
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
          </div> */}

          {/* Tab Content */}
          {/* <div className="my-12">
            <h4 className="text-blue-800 text-3xl font-bold">
              Digital Security Details
            </h4>
          </div> */}
          <div>
            {/* {activeTab === "balance" && (
              <div className="relative w-full max-w-lg mx-auto mt-6">
              
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

               
                <button
                  className="absolute bottom-6 right-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition"
                  
                >
                  Transfer
                </button>
              </div>
            )} */}

            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    {Headers.map((header) => (
                      <th className="p-4 pt-7 pb-7 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-bold leading-none text-slate-500">
                          {header}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Render the Token List */}
                  {tokensList?.map((token, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {token.token_id}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {token.name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {token.symbol}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {token.type}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <button
                          onClick={() => {
                            NavigationToScreen("/nftsList", token.token_id);
                          }}
                          type="button"
                          className="rounded border-2 border-blue-500 px-2 py-1 text-xs font-medium text-blue-600 transition duration-150 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          NFTs
                        </button>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <button
                          onClick={() => {
                            NavigationToScreen("/tokenDetail", token.token_id);
                          }}
                          type="button"
                          className="rounded border-2 border-blue-500 px-2 py-1 text-xs font-medium uppercase text-blue-600 transition duration-150 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
