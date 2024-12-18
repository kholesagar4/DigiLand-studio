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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const Headers = [
    "Token Id",
    "Token Name",
    "Token Symbol",
    "Token Type",
    "NFTsList",
    "Action",
  ];

  useEffect(() => {
    const getAccountId: string | null = localStorage.getItem("accountId");
    fetchTokens(getAccountId);
  }, []);

  const fetchTokens = async (accountId: string | null) => {
    setIsLoading(true);
    try {
      const body = {
        "account.id": accountId,
        order: "desc",
        type: "NON_FUNGIBLE_UNIQUE",
      };

      const url = `${envConfig.PUBLIC_BASE_URL}${apiRoutes.tokens}`;

      const response = await axios.get(url, { params: body });

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
    const tokenData = { tokenId: token_id };
    localStorage.setItem("tokenData", JSON.stringify(tokenData));
    window.location.href = route;
  };

  const totalPages = Math.ceil(tokensList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTokens = tokensList.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex bg-blue-200 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 ml-4 ">
            TokenList
            </h2>
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  {Headers.map((header, index) => (
                    <th key={index} className="p-4 pt-7 pb-7 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-bold leading-none text-slate-500">
                        {header}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTokens.map((token, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{token.token_id}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{token.name}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{token.symbol}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{token.type}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <button
                        onClick={() => NavigationToScreen("/nftsList", token.token_id)}
                        type="button"
                        className="rounded border-2 border-blue-500 px-2 py-1 text-xs font-medium text-blue-600 transition duration-150 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        NFTs
                      </button>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <button
                        onClick={() => NavigationToScreen("/tokenDetail", token.token_id)}
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

            {/* Pagination Controls */}
            {tokensList.length > itemsPerPage && (
              <div className="flex justify-between items-center p-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white'}`}
                >
                  Previous
                </button>

                <p className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </p>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

