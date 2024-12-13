import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

type Transfer = {
  account: string;
  amount: number;
  is_approval: boolean;
};
const TransactionDetails = () => {
  const [transfersList, setTransfersList] = useState<Transfer[]>([]);

  const Headers = ["Account", "Amount", "Approval"];

  useEffect(() => {
    const getTransferList = localStorage.getItem("transferList");
    if (getTransferList) {
      const parsedList: Transfer[] = JSON.parse(getTransferList);
      setTransfersList(parsedList);
    }
  }, []);

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
                    <tr key={1} className="hover:bg-slate-50">
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
