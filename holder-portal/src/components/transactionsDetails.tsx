import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { apiRoutes } from "../config/apiRoutes";
import { envConfig } from "../config/envConfig";
import axios, { HttpStatusCode } from "axios";

type Transfer = {
  account: string;
  amount: number;
  is_approval: boolean;
};
const TransactionDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transfersList, setTransfersList] = useState<Transfer[]>([]);

  const Headers = ["Account", "Amount", "Approval"];

  useEffect(() => {
    handleTransactionDetails();
  }, []);

  const handleTransactionDetails = async () => {
    const transactionId = localStorage.getItem("transferDetails");
    if (transactionId !== null) {
      const parsedData = JSON.parse(transactionId);
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${envConfig.PUBLIC_BASE_URL}${apiRoutes.transaction}/${parsedData}`
        );

        if (!response.data) {
          throw new Error("Error creating token");
        } else if (response?.status === HttpStatusCode.Ok) {
          setTransfersList(response?.data?.transactions[0].transfers);
        }
      } catch (error) {
        alert("Error");
      } finally {
        setIsLoading(false);
      }
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
                  {transfersList?.map((transfer, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {transfer.account}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {transfer.amount}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {transfer.is_approval ? "Yes" : "No"}
                        </p>
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

export default TransactionDetails;
