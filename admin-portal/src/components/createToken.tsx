import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import axios, { HttpStatusCode } from "axios";
import { commonConstants } from "../../common/commonConstants";
import { envConfig } from "../config/envConfig";

const CreateToken = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleCreateToken = async () => {
    setIsLoading(true);
    try {
      if (!tokenName || !tokenSymbol) {
        alert("Please select a token name and symbol before creating a token.");
        return;
      }

      const body = {
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
      };

      const response = await axios.post(
        `${envConfig.PUBLIC_BASE_URL}/${commonConstants.createToken}`,
        body
      );

      if (!response.data) {
        throw new Error("Error creating token");
      } else if (response?.data?.statusCode === HttpStatusCode.Created) {
        setShowSuccessPopup(true);
        const tokenId = response?.data?.data?.tokenId;
        localStorage.setItem("tokenId", tokenId);
      }
    } catch (error) {
      console.error("Error creating token:", error);
      alert("Error creating token!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-green-100 via-green-200 to-green-300 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <div className="bg-white p-8 rounded-lg shadow-md w-4/5 mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">
              Create Token
            </h2>

            <div className="bg-green-100 p-4 rounded-lg shadow-md mx-auto mb-8">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Token Creation
              </h3>
              <p className="text-md font-semibold text-green-500 mb-2">
                Create a new token on the Hedera Hashgraph network. You can
                create fungible or non-fungible tokens (NFTs) for various use
                cases.
              </p>
            </div>
            {showSuccessPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div
                  className={`bg-green-200 text-green-800 p-10 rounded-xl shadow-2xl transition-all transform ${
                    showSuccessPopup
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  } animate-fade-in`}
                  style={{ animationDuration: "1s", width: "500px" }}
                >
                  <h3 className="text-3xl font-bold animate-bounce">
                    Success!
                  </h3>
                  <p className="mt-4 text-lg">Token Created Successfully!</p>
                  <button
                    className="justify-center items-center mt-6 px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 hover:scale-105 transform transition-transform duration-300"
                    onClick={() => setShowSuccessPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <div className="max-h-[500px] overflow-auto">
              <form className="space-y-8">
                {/* Basic Info Section */}
                <div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">
                    1. Basic Info
                  </h4>

                  <div className="relative mb-8 flex items-center">
                    {/* Token Name Label */}
                    <label
                      htmlFor="tokenName"
                      className="block text-sm font-medium text-green-600 mr-3"
                    >
                      Token Name :
                    </label>

                    {/* Tooltip Button */}
                    <button
                      className="text-green-600 hover:text-green-800"
                      onMouseEnter={() => setHoveredTooltip("tokenName")}
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

                    {/* Dropdown for Token Name */}
                    <select
                      id="tokenName"
                      value={tokenName}
                      onChange={(e) => {
                        setTokenName(e.target.value);
                      }}
                      className="w-1/2 px-4 py-2 ml-6 border rounded border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                    >
                      <option value="">
                        - - - - - Select Token Name - - - - -
                      </option>
                      <option value="landParcel">Land Parcel Token</option>
                      <option value="agriculturalLandParcel">
                        Agricultural Land Parcel Token
                      </option>
                    </select>

                    {/* Tooltip */}
                    {hoveredTooltip === "tokenName" && (
                      <div
                        className="absolute -top-10 left-0 bg-yellow-100 text-yellow-800 p-2 rounded-md shadow-md w-72"
                        onMouseEnter={() => setHoveredTooltip("tokenName")}
                        onMouseLeave={() => setHoveredTooltip("")}
                      >
                        Token name can be up to 100 letters, and they are not
                        unique on the Hedera network
                      </div>
                    )}
                  </div>

                  <div className="relative mb-4 flex items-center">
                    <label
                      htmlFor="tokenSymbol"
                      className="block text-sm font-medium text-green-600 mr-3"
                    >
                      Token Symbol :
                    </label>
                    <button
                      className="text-green-600 hover:text-green-800"
                      onMouseEnter={() => setHoveredTooltip("tokenSymbol")}
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

                    {/* Dropdown for Token Name */}
                    <select
                      id="tokenSymbol"
                      value={tokenSymbol}
                      onChange={(e) => {
                        setTokenSymbol(e.target.value);
                      }}
                      className="w-1/2 px-4 py-2 ml-6 border rounded border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                    >
                      <option value="">
                        - - - - - Select Token Symbol - - - - -
                      </option>
                      <option value="landToken">LAND</option>
                      <option value="agricultureToken">AGRICULTURE</option>
                    </select>

                    {/* Tooltip */}
                    {hoveredTooltip === "tokenSymbol" && (
                      <div
                        className="absolute -top-10 left-0 bg-yellow-100 text-yellow-800 p-2 rounded-md shadow-md w-72"
                        onMouseEnter={() => setHoveredTooltip("tokenSymbol")}
                        onMouseLeave={() => setHoveredTooltip("")}
                      >
                        A short, non-unique token symbol (up to 100 characters)
                        represents tokens on Hedera, with shorter symbols
                        recommended.
                      </div>
                    )}
                  </div>
                </div>

                <hr className="my-2 border-green-400" />

                {/* Supply Section */}
                <div>
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-green-600 mb-1">
                      2. Supply
                    </h4>
                    <h4 className="text-green-600 text-sm">
                      How much there would be and how much there can be?
                    </h4>
                  </div>

                  <div className="relative mb-4 flex items-center">
                    <label
                      htmlFor="supplyType"
                      className="block text-sm font-medium text-green-600 mr-3"
                    >
                      Supply Type :
                    </label>
                    <button
                      className="text-green-600 hover:text-green-800"
                      onMouseEnter={() => setHoveredTooltip("supplyType")}
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

                    <select
                      id="supplyType"
                      className="w-1/2 px-4 py-2 ml-6 border rounded border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                    >
                      <option value="landParcel">Infinite</option>
                      <option value="agriculturalLandParcel">
                        Finite
                      </option>
                    </select>

                    {hoveredTooltip === "supplyType" && (
                      <div className="absolute -top-10 left-0 bg-yellow-100 text-yellow-800 p-2 rounded-md shadow-md w-72"
                      onMouseEnter={() => setHoveredTooltip("supplyType")}
                      onMouseLeave={() => setHoveredTooltip("")}
                       >
                        Infinite supply allows minting and burning of additional tokens after creation, while Finite supply is set 
                        during the creation and cannot be changed later.
                      </div>
                    )}
                  </div>
                </div>

                <hr className="my-2 border-green-400" />

                {/* Keys Section */}
                <div>
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-green-600 mb-1">
                      3. Keys
                    </h4>
                   
                    <h4 className="text-green-600 text-sm mb-4">
                      Do you want to be able to update part of token properties
                      and information in the future?
                    </h4>
                    {/* Admin Key */}
                    <div className="flex items-start mb-4">
                      <input
                        type="checkbox"
                        id="adminKey"
                        className="mt-1 ml-1 mr-3 h-5 w-5 text-green-600 border-green-400 focus:ring-green-500"
                        onChange={(e) => e.target.checked}
                      />
                      <div>
                        <label
                          htmlFor="adminKey"
                          className="block text-md font-medium text-green-600"
                        >
                          Admin Key
                        </label>
                        <p className="text-sm text-gray-500 mt-2">
                          The key which can perform token update and token
                          delete operations on the token. The admin key has the
                          authority to change the supply key, freeze key and
                          pause key, wipe key and kyc key. It can also update
                          the treasury account of the token. If empty, the token
                          can be perceived as immutable (not being able to being
                          updated).
                        </p>
                      </div>
                    </div>
                    {/* Supply Key */}
                    <div className="flex items-start mb-4">
                      <input
                        type="checkbox"
                        id="supplyKey"
                        className="mt-1 ml-1 mr-3 h-5 w-5 text-green-600 border-green-400 focus:ring-green-500"
                        onChange={(e) => e.target.checked}
                      />
                      <div>
                        <label
                          htmlFor="supplyKey"
                          className="block text-md font-medium text-green-600 mb-2"
                        >
                          Supply Key
                        </label>
                        <p className="text-sm text-gray-500">
                          The key which can change the total supply of the
                          token. This key is used to authorize token mint and
                          burn transactions. If this is left empty,
                          minting/burning tokens is not possible.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <input
                        type="checkbox"
                        id="kycKey"
                        className="mt-1 ml-1 mr-3 h-5 w-5 text-green-600 border-green-400 focus:ring-green-500"
                        onChange={(e) => e.target.checked}
                      />
                      <div>
                        <label
                          htmlFor="kycKey"
                          className="block text-md font-medium text-green-600 mb-2"
                        >
                          KYC Key
                        </label>
                        <p className="text-sm text-gray-500">
                          The key which can grant or revoke KYC of an account
                          for the token's transactions. If empty, KYC is not
                          required, and KYC grant or revoke operations are not
                          possible.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <input
                        type="checkbox"
                        id="wipeKey"
                        className="mt-1 ml-1 mr-3 h-5 w-5 text-green-600 border-green-400 focus:ring-green-500"
                        onChange={(e) => e.target.checked}
                      />
                      <div>
                        <label
                          htmlFor="wipeKey"
                          className="block text-md font-medium text-green-600 mb-2"
                        >
                          wipe Key
                        </label>
                        <p className="text-sm text-gray-500">
                          The key which can wipe the token balance of an
                          account. If empty, wipe is not possible.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <input
                        type="checkbox"
                        id="freezeKey"
                        className="mt-1 ml-1 mr-3 h-5 w-5 text-green-600 border-green-400 focus:ring-green-500"
                        onChange={(e) => e.target.checked}
                      />
                      <div>
                        <label
                          htmlFor="freezeKey"
                          className="block text-md font-medium text-green-600 mb-2"
                        >
                          Freeze Key
                        </label>
                        <p className="text-sm text-gray-500">
                          The key which can sign to freeze or unfreeze an
                          account for the token transactions. If empty, freezing
                          is not possible.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <input
                        type="checkbox"
                        id="pauseKey"
                        className="mt-1 ml-1 mr-3 h-5 w-5 text-green-600 border-green-400 focus:ring-green-500"
                        onChange={(e) => e.target.checked}
                      />
                      <div>
                        <label
                          htmlFor="pauseKey"
                          className="block text-md font-medium text-green-600 mb-2"
                        >
                          Pause Key
                        </label>
                        <p className="text-sm text-gray-500">
                          The key which has authority to pause or unpause a
                          token. Pausing a token prevents a token from
                          participating in all transactions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mb-4">
                      <input
                        type="checkbox"
                        id="metadataKey"
                        className="mt-1 ml-1 mr-3 h-5 w-5 text-green-600 border-green-400 focus:ring-green-500"
                        onChange={(e) => e.target.checked}
                      />
                      <div>
                        <label
                          htmlFor="metadataKey"
                          className="block text-md font-medium text-green-600 mb-2"
                        >
                          Metadata Key
                        </label>
                        <p className="text-sm text-gray-500">
                          The metadata key is essential for update the metadata
                          of the tokenon the hedera network. According to
                          Hedera, if this is not setting during the initial
                          token creation process, it cannot be added later (This
                          means that the ability to create token's metadata must
                          be established at the time of creation, otherwise the
                          metadata will be remain unchanged).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCreateToken}
                    className={`w-80 bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    } mt-6`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Token..." : "Create Token"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateToken;
