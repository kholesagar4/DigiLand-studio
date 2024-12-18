import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import axios, { HttpStatusCode } from "axios";
import { envConfig } from "../config/envConfig";
import { commonConstants } from "../../common/commonConstants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PauseToken = () => {
  const [tokenId, setTokenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);

  // Handle pause token action
  const handlePauseToken = async () => {
    setIsLoading(true);
    try {
      const body = {
        tokenId: tokenId,
      };
      const response = await axios.post(
        `${envConfig.PUBLIC_BASE_URL}/${commonConstants.pauseToken}`,
        body
      );

      if (!response?.data) {
        window.alert("Error in pausing token");
      } else if (response?.data?.statusCode === HttpStatusCode.Ok) {
        setShowSuccessPopup(true);

        toast.success("Token Paused Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          theme: "colored",
          className: "bg-red-600 text-white", // Custom styling for toaster
        });
      }
    } catch (error) {
      console.error("Error pausing token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show warning popup
  const handlePauseButtonClick = () => {
    setShowWarningPopup(true);
  };

  // Close warning popup and pause token if user agrees
  const handleAgreeToPause = () => {
    setShowWarningPopup(false);
    handlePauseToken();
  };

  return (
    <div className="flex bg-gradient-to-r from-green-100 via-green-200 to-green-300 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <div className="bg-white p-8 rounded-lg shadow-md w-4/5 mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">
              Pause Token
            </h2>

            <div className="bg-green-100 p-4 rounded-lg shadow-md mx-auto mb-8">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Token pause
              </h3>
              <p className="text-md font-semibold text-green-500 mb-2">
                Temporarily suspend all transfers of a specific token on the
                Hedera network. Ensure that you have the necessary
                administrative permissions to pause token transfers, as this
                action affects all token holders.
              </p>
            </div>

            <div className="max-h-[500px] overflow-auto">
              <form className="space-y-8">
                <div>
                  <div className="mb-10">
                    <div className="relative mb-8 flex items-center">
                      <label
                        htmlFor="tokenId"
                        className="block text-sm font-medium text-green-600 mr-3"
                      >
                        Token Id :
                      </label>
                      <button
                        className="text-green-600 hover:text-green-800"
                        onMouseEnter={() => setHoveredTooltip("tokenId")}
                        onMouseLeave={() => setHoveredTooltip("")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="ml-3 dark:text-white text-primary-700"
                        >
                          <path
                            fill="currentColor"
                            d="M9.168 14.167h1.667v-5H9.168v5Zm.833-6.667c.236 0 .434-.08.594-.24a.803.803 0 0 0 .24-.593.806.806 0 0 0-.24-.594.807.807 0 0 0-.594-.24.806.806 0 0 0-.593.24.806.806 0 0 0-.24.594c0 .236.08.434.24.594.16.16.357.24.593.24Zm0 10.834a8.115 8.115 0 0 1-3.25-.657 8.415 8.415 0 0 1-2.646-1.78 8.416 8.416 0 0 1-1.78-2.647A8.115 8.115 0 0 1 1.667 10c0-1.152.219-2.236.656-3.25a8.416 8.416 0 0 1 1.781-2.646 8.415 8.415 0 0 1 2.646-1.78A8.115 8.115 0 0 1 10 1.667c1.153 0 2.236.219 3.25.656a8.415 8.415 0 0 1 2.646 1.781 8.416 8.416 0 0 1 1.781 2.646 8.115 8.115 0 0 1 .657 3.25 8.115 8.115 0 0 1-.657 3.25 8.416 8.416 0 0 1-1.78 2.646 8.415 8.415 0 0 1-2.647 1.781 8.115 8.115 0 0 1-3.25.657Zm0-1.667c1.861 0 3.438-.646 4.73-1.938 1.291-1.291 1.937-2.868 1.937-4.729 0-1.86-.646-3.437-1.938-4.729-1.291-1.292-2.868-1.937-4.729-1.937-1.86 0-3.437.645-4.729 1.937-1.292 1.292-1.937 2.868-1.937 4.73 0 1.86.645 3.437 1.937 4.729 1.292 1.291 2.868 1.937 4.73 1.937Z"
                          />
                        </svg>
                      </button>

                      <input
                        type="text"
                        id="tokenId"
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        className="w-1/2 px-4 py-2 ml-6 border rounded border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                        placeholder="Enter Token ID"
                      />

                      {hoveredTooltip === "tokenId" && (
                        <div
                          className="absolute -top-0 left-0 bg-yellow-100 text-yellow-800 p-2 rounded-md shadow-md w-72"
                          onMouseEnter={() => setHoveredTooltip("tokenId")}
                          onMouseLeave={() => setHoveredTooltip("")}
                        >
                          A unique identifier for each token on the Hedera
                          network, in the format 0.0.xxxxx
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className="my-2 border-green-400" />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handlePauseButtonClick}
                      className={`w-80 bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      } mt-6`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Pausing Token..." : "Pause Token"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Success popup */}
            {showSuccessPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                  className="bg-red-100 text-red-800 p-6 rounded-lg shadow-lg transition-opacity opacity-0 animate-fade-in"
                  style={{ animationDuration: "1s" }}
                >
                  <h3 className="text-xl font-semibold">Success!</h3>
                  <p>Token Paused Successfully!</p>
                  <button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => setShowSuccessPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {showWarningPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-red-100 text-red-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                  <h3 className="text-2xl font-bold text-red-800">
                    Warning: Dangerous Action
                  </h3>
                  <p className="mt-2 text-lg">
                    Are you sure you want to <strong>pause this token</strong>?
                    This action cannot be undone, and will have significant
                    consequences.{" "}
                    <strong>
                      Proceeding with this action is entirely at your own risk.
                    </strong>
                  </p>
                  <p className="mt-4 text-sm text-red-700">
                    This token pause will halt all operations tied to it. You
                    may lose access or cause issues with other components that
                    rely on this token. Please double-check before continuing.
                  </p>
                  <div className="flex justify-end mt-6">
                    <button
                      className="mr-4 px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                      onClick={() => setShowWarningPopup(false)}
                    >
                      No, Cancel
                    </button>
                    <button
                      className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                      onClick={handleAgreeToPause}
                    >
                      Yes, I understand the risks
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PauseToken;
