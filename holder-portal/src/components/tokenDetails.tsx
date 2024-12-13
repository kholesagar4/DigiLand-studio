import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import axios, { HttpStatusCode } from "axios";
import { envConfig } from "../config/envConfig";
import { apiRoutes } from "../config/apiRoutes";

type TokenDetails = {
  admin_key: {
    _type: string;
    key: string;
  };
  auto_renew_account: string | null;
  auto_renew_period: number;
  created_timestamp: string;
  custom_fees: {
    created_timestamp: string;
    fixed_fees: Array<unknown>;
    royalty_fees: Array<unknown>;
  };
  decimals: string;
  deleted: boolean;
  expiry_timestamp: number;
  fee_schedule_key: string | null;
  freeze_default: boolean;
  freeze_key: string | null;
  initial_supply: string;
  kyc_key: string | null;
  max_supply: string;
  memo: string;
  metadata: string;
  metadata_key: string | null;
  modified_timestamp: string;
  name: string;
  pause_key: {
    _type: string;
    key: string;
  } | null;
  pause_status: string;
  supply_key: {
    _type: string;
    key: string;
  } | null;
  supply_type: string;
  symbol: string;
  token_id: string;
  total_supply: string;
  treasury_account_id: string;
  type: string;
  wipe_key: string | null;
};

const TokenDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null);
  const [accountBalances, setAccountBalances] = useState();

  useEffect(() => {
    const getFromLocal: string | null = localStorage.getItem("tokenData");

    if (getFromLocal !== null) {
      const parsedData = JSON.parse(getFromLocal); // Parse the JSON string
      const token_id = parsedData.tokenId; // Access the token_id field
      goToTokenDetails(token_id);
      getTokenBalance(token_id);
    }
  }, []);

  const goToTokenDetails = async (token_id: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${envConfig.PUBLIC_BASE_URL}${apiRoutes.tokens}/${token_id}`
      );
      if (!response.data) {
        throw new Error("Error creating token");
      } else if (response?.status === HttpStatusCode.Ok) {
        setTokenDetails(response.data);
      }
    } catch (error) {
      alert("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const getTokenBalance = async (token_id: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${envConfig.PUBLIC_BASE_URL}${apiRoutes.tokens}/${token_id}/balances`
      );
      if (!response.data) {
        throw new Error("Error creating token");
      } else if (response?.status === HttpStatusCode.Ok) {
        setAccountBalances(response.data.balances[0].balance);
      }
    } catch (error) {
      alert("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <div className="my-12">
            <h4 className="text-blue-800 text-3xl font-bold">Token Details</h4>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {tokenDetails && (
              <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 text-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={"https://via.placeholder.com/48"}
                    alt={tokenDetails.symbol}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                  />
                  <h4 className="text-2xl font-bold">{tokenDetails.symbol}</h4>
                </div>

                <div className="text-center">
                  {tokenDetails.pause_status === "PAUSED" && (
                    <>
                      <p className="text-lg mt-2">
                        <span className="font-bold text-red-700 text-3xl ">
                          A stay order on land is a temporary court-issued order
                          you can not transfer.
                        </span>{" "}
                      </p>
                      <hr className="border-white my-2" />
                    </>
                  )}

                  <p className="text-lg mt-2">
                    <span className="font-semibold">Token ID:</span>{" "}
                    {tokenDetails.token_id}
                  </p>
                  <hr className="border-white my-2" />
                  <p className="text-lg mt-2">
                    <span className="font-semibold">Token Name:</span>{" "}
                    {tokenDetails.name}
                  </p>
                  <hr className="border-white my-2" />
                  <p className="text-lg mt-2">
                    <span className="font-semibold">Token Type:</span>{" "}
                    {tokenDetails.type}
                  </p>
                  <hr className="border-white my-2" />
                  <p className="text-lg mt-2">
                    <span className="font-semibold">Balance:</span>{" "}
                    {accountBalances}
                  </p>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default TokenDetails;
