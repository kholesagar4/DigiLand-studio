import axios, { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { apiRoutes } from "../config/apiRoutes";
import { envConfig } from "../config/envConfig";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

type Transaction = {
  bytes: string | null;
  charged_tx_fee: number;
  consensus_timestamp: string;
  entity_id: string | null;
  max_fee: string;
  memo_base64: string;
  name: string;
  nft_transfers: Array<unknown>;
  node: string;
  nonce: number;
  parent_consensus_timestamp: string | null;
  result: string;
  scheduled: boolean;
  staking_reward_transfers: Array<unknown>;
  token_transfers: Array<unknown>;
  transaction_hash: string;
  transaction_id: string;
  transfers: Array<{
    account: string;
    amount: number;
    is_approval: boolean;
  }>;
  valid_duration_seconds: string;
  valid_start_timestamp: string;
};
const Transactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const Headers = [
    "Transaction Id",
    "Transaction Name",
    "Transaction Result",
    "Transfers",
  ];

  useEffect(() => {
    handleTransaction();
  }, []);
  const handleTransaction = async () => {
    const accountId = localStorage.getItem("accountId");
    setIsLoading(true);
    try {
      const body = {
        "account.id": accountId,
        order: "desc",
        transactiontype: "cryptotransfer",
      };
      const response = await axios.get(
        `${envConfig.PUBLIC_BASE_URL}${apiRoutes.transaction}`,
        { params: body }
      );

      if (!response.data) {
        throw new Error("Error creating token");
      } else if (response?.status === HttpStatusCode.Ok) {
        setTransactionList(response?.data?.transactions);
      }
    } catch (error) {
      alert("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const NavigationToScreen = (route: string, transactionId: string) => {
    localStorage.setItem("transferDetails", JSON.stringify(transactionId));

    // Navigate to the next page
    window.location.href = route;
  };

  const totalPages = Math.ceil(transactionList.length / recordsPerPage);
  const paginatedTokens = transactionList.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

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
                  {paginatedTokens?.map((transaction, index) => (
                    <tr key={1} className="hover:bg-slate-50">
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {transaction.transaction_id}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {transaction.name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {transaction.result}
                        </p>
                      </td>

                      <td className="p-4 border-b border-slate-200">
                        <button
                          onClick={() => {
                            NavigationToScreen(
                              "/transactionDetails",
                              transaction.transaction_id
                            );
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

              {/* Pagination Controls */}
              <div className="flex justify-between items-center p-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-gray-200 rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-gray-200 rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
