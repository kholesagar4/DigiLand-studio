  import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Dashboard = () => {
  const goToCreateToken = () => {
    window.location.href = '/createtoken';
  };

  const goToMintToken = () => {
    window.location.href = '/minttoken';
  };

  const goToTransferToken = () => {
    window.location.href = '/transfertoken';
  };

  return (
    <div className="flex bg-gradient-to-r from-green-100 via-green-200 to-green-300 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-6">Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-50">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Create Token</h3>
              <p className="text-sm text-green-500 mb-4">
                Create a new token for land ownership.
              </p>
              <button
                onClick={goToCreateToken}
                className="block text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition transform duration-200 ease-in-out hover:scale-105"
              >
                Go to Create Token
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-50">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Mint Token</h3>
              <p className="text-sm text-green-500 mb-4">
                Mint tokens once created.
              </p>
              <button
                onClick={goToMintToken}
                className="block text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition transform duration-200 ease-in-out hover:scale-105"
              >
                Go to Mint Token
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-50">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Transfer Token</h3>
              <p className="text-sm text-green-500 mb-4">
                Transfer tokens between users.
              </p>
              <button
                onClick={goToTransferToken}
                className="block text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition transform duration-200 ease-in-out hover:scale-105"
              >
                Go to Transfer Token
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
