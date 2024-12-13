import axios, { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { apiRoutes } from "../config/apiRoutes";
import { envConfig } from "../config/envConfig";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

type Token = {
  admin_key: {
    _type: string; // Represents the type of key, e.g., "ECDSA_SECP256K1"
    key: string; // The actual key value
  };
  metadata: string; // Metadata as a string
  name: string; // Name of the token
  symbol: string; // Symbol of the token
  token_id: string; // Unique token identifier
  type: "NON_FUNGIBLE_UNIQUE" | string; // Token type, default is "NON_FUNGIBLE_UNIQUE"
  decimals: number; // Decimals (usually 0 for non-fungible tokens)
};

const NftsList = () => {
  const [activeTab, setActiveTab] = useState("balance");
  const [isLoading, setIsLoading] = useState(false);

  const [nftsList, setNftsList] = useState([]);
  const Headers = [
    "Token Id",
    "Token Name",
    "Token Symbol",
    "Token Type",
    "Action",
  ];

  useEffect(() => {
    getNfts();
  }, []);
  const getNfts = async () => {
    const getFromLocal = localStorage.getItem("tokenData");
    const parsedData = getFromLocal ? JSON.parse(getFromLocal) : null;

    const token_id = parsedData.tokenId; // Access the token_id field
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${envConfig.PUBLIC_BASE_URL}${apiRoutes.tokens}/${token_id}/nfts`
      );

      if (!response.data) {
        throw new Error("Error creating token");
      } else if (response?.status === HttpStatusCode.Ok) {
        setNftsList(response.data.nfts);
      }
    } catch (error) {
      alert("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-blue-200 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <div>
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
                  {nftsList?.map((token, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {"token.token_id"}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {"token.name"}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {"token.symbol"}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {"token.type"}
                        </p>
                      </td>

                      <td className="p-4 border-b border-slate-200">
                        <button
                          onClick={() => {
                            // Set the tokenData
                            // const tokenData = {
                            //   tokenId: token.token_id,
                            // };
                            // localStorage.setItem(
                            //   "tokenData",
                            //   JSON.stringify(tokenData)
                            // );
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

export default NftsList;
