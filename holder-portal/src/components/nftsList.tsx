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

type NFT = {
  account_id: string,
  created_timestamp: string,
  delegating_spender: null,
  deleted: boolean,
  metadata: string,
  serial_number: number,
  spender: null,
  token_id: string
};

const NftsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nftsList, setNftsList] = useState([]);
  const Headers = ["Token Id", "serial No", "Created at", "Account Id"];

  useEffect(() => {
    getNfts();
  }, []);

  const getNfts = async () => {
    const getFromLocal = localStorage.getItem("tokenData");
    const parsedData = getFromLocal ? JSON.parse(getFromLocal) : null;
    const token_id = parsedData?.tokenId; 

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${envConfig.PUBLIC_BASE_URL}${apiRoutes.tokens}/${token_id}/nfts`
      );

      if (!response.data) {
        throw new Error("Error creating token");
      } else if (response?.status === HttpStatusCode.Ok) {
        setNftsList(response?.data?.nfts);
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
                    {Headers.map((header, index) => (
                      <th 
                        key={index} 
                        className="p-4 pt-7 pb-7 border-b border-slate-300 bg-slate-50"
                      >
                        <p className="block text-sm font-bold leading-none text-slate-500">
                          {header}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={Headers.length} className="p-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : nftsList.length > 0 ? (
                    nftsList.map((token: NFT, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                          <p className="block text-sm text-slate-800">
                            {token.token_id}
                          </p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                          <p className="block text-sm text-slate-800">
                            {token.serial_number}
                          </p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                          <p className="block text-sm text-slate-800">
                          {new Date(Number(token.created_timestamp) * 1000).toLocaleString()}                          
                          </p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                          <p className="block text-sm text-slate-800">
                            {token.account_id}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={Headers.length} className="p-4 text-center text-slate-500">
                        No NFTs found against this account
                      </td>
                    </tr>
                  )}
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
