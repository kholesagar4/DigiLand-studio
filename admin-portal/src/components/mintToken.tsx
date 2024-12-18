import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import axios, { HttpStatusCode } from "axios";
import { commonConstants } from "../../common/commonConstants";
import { envConfig } from "../config/envConfig";

const MintToken = () => {
  const [assetType, setAssetType] = useState("fungible");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const [metadata, setMetadata] = useState<{
    [key: string]: string;
  }>({
    surveyNumber: "",
    ownerName: "",
    location: "",
    size: "",
    landType: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const storedTokenId = localStorage.getItem("tokenId");
    if (storedTokenId) {
      setTokenId(storedTokenId);
    }
  }, []);

  const handleMintToken = async () => {
    setIsLoading(true);
    try {
      const body = {
        tokenId,
        surveyNumber: metadata.surveyNumber,
        ownerName: metadata.ownerName,
        location: metadata.location,
        size: metadata.size,
        landType: metadata.landType,
        additionalInfo: metadata.additionalInfo,
      };

      // Making the POST request to mint the token
      const response = await axios.post(
        `${envConfig.PUBLIC_BASE_URL}/${commonConstants.mintToken}`,
        body
      );

      if (!response.data) {
        throw new Error("Error minting token");
      } else if (response?.data?.statusCode === HttpStatusCode.Ok) {
        setShowSuccessPopup(true);
      }
    } catch (error) {
      console.error("Error minting token:", error);
      alert("Error minting token!");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle the change of metadata fields
  const handleFieldChange = (field: string, value: string) => {
    setMetadata({
      ...metadata,
      [field]: value,
    });
  };

  return (
    <div className="flex bg-gradient-to-r from-green-100 via-green-200 to-green-300 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-grow p-6">
          <div className="bg-white p-8 rounded-lg shadow-md w-4/5 mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">
              Mint Token
            </h2>

            <div className="bg-green-100 p-4 rounded-lg shadow-md mx-auto mb-8">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                Token mintation
              </h3>
              <p className="text-md font-semibold text-green-500 mb-2">
                Mint a new token on the Hedera network by tokenizing your
                assets. You can create both fungible and non-fungible tokens.
              </p>
            </div>
            <div className="max-h-[500px] overflow-auto">
              <form className="space-y-8">
                {/* Token Info Section */}
                <div>
                  <div className="mb-10">
                    <h4 className="text-lg font-semibold text-green-600 mb-2">
                      1. Token Info
                    </h4>

                    <div className="relative mb-8 flex items-center">
                      <label
                        htmlFor="tokenId"
                        className="block text-sm font-medium text-green-600 mr-3"
                      >
                        Token ID :
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
                      <span className="ml-6 px-4 py-2 border rounded border-green-300 bg-gray-200 text-gray-600">
                        {tokenId}
                      </span>
                      {hoveredTooltip === "tokenId" && (
                        <div
                          className="absolute -top-10 left-0 bg-yellow-100 text-yellow-800 p-2 rounded-md shadow-md w-72"
                          onMouseEnter={() => setHoveredTooltip("tokenId")}
                          onMouseLeave={() => setHoveredTooltip("")}
                        >
                          A unique identifier for each token on the Hedera
                          network, in the format 0.0.xxxxx
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="relative mb-4 flex items-center">
                        <label
                          htmlFor="assetType"
                          className="block text-sm font-medium text-green-600 mr-3"
                        >
                          Asset Type :
                        </label>
                        <button
                          className="text-green-600 hover:text-green-800"
                          onMouseEnter={() => setHoveredTooltip("assetType")}
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
                        {hoveredTooltip === "assetType" && (
                          <div
                            className="absolute -top-10 left-0 bg-yellow-100 text-yellow-800 p-2 rounded-md shadow-md w-72"
                            onMouseEnter={() => setHoveredTooltip("assetType")}
                            onMouseLeave={() => setHoveredTooltip("")}
                          >
                            In Hedera, assets can be categorized as either
                            fungible, where each unit is identical in value
                            (e.g., tokens like HBAR), or non-fungible, where
                            each asset is unique and has distinct value (e.g.,
                            NFTs).
                          </div>
                        )}
                        <select
                          id="assetType"
                          value={assetType}
                          onChange={(e) => setAssetType(e.target.value)}
                          className="ml-6 px-4 py-2 border rounded border-green-300 bg-gray-200 text-gray-600"
                        >
                          <option value="Non-Fungible">Non-Fungible</option>
                          <option value="Fungible">Fungible</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="mb-2">
                      <div className="flex">
                      <h4 className="text-lg font-semibold text-green-600 mb-1">
                        2. Metadata
                      </h4>

                      <button
                          className="text-green-600 hover:text-green-800"
                          onMouseEnter={() => setHoveredTooltip("metadata")}
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
                        {hoveredTooltip === "metadata" && (
                          <div
                            className="absolute top-82 left-60 bg-yellow-100 text-yellow-800 p-2 rounded-md shadow-md w-72"
                            onMouseEnter={() => setHoveredTooltip("metadata")}
                            onMouseLeave={() => setHoveredTooltip("")}
                          >
                            metadata often includes unique details such as images, properties, and links to digital assets. 
                            metadata helps in identifying and managing the token,
                             enhancing its functionality and user experience.
                          </div>
                        )}
                      </div>
                     
                      <h4 className="text-green-600 text-sm">
                        Modify the metadata details for your token below:
                      </h4>
                    </div>

                    <div className="mt-8 flex space-x-8">
                      {/* Cards for Metadata Fields */}
                      <div className="p-6 rounded-lg shadow-md border border-gray-200 bg-green-100 w-1/2">
                        <h4 className="text-lg font-semibold text-green-600 mb-4">
                          Metadata Fields
                        </h4>
                        <div className="space-y-4">
                          {Object.keys(metadata).map((key) => (
                            <div
                              key={key}
                              className="flex justify-between items-center"
                            >
                              <label
                                htmlFor={key}
                                className="text-green-600 font-semibold"
                              >
                                {key}:
                              </label>
                              <input
                                id={key}
                                type="text"
                                value={metadata[key]}
                                onChange={(e) =>
                                  handleFieldChange(key, e.target.value)
                                }
                                placeholder={`Enter ${key}`}
                                className="w-2/3 px-4 py-2 ml-6 border rounded border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* JSON Display */}
                      <div className="bg-black text-white p-4 rounded shadow w-1/2">
                        <pre>{JSON.stringify(metadata, null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="mt-6 flex justify-end mr-4">
                <button
                  onClick={handleMintToken}
                  disabled={isLoading}
                  className={`${
                    isLoading
                      ? "bg-gray-300 text-gray-600"
                      : "bg-green-600 text-white"
                  } px-6 py-3 rounded-lg`}
                >
                  {isLoading ? "Minting..." : "Mint Token"}
                </button>
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
                    <p className="mt-4 text-lg">Token Minted Successfully!</p>
                    <p className="text-md text-gray-600">
                      Your token has been minted successfully. You can now view
                      the details.
                    </p>
                    <button
                      className="justify-center items-center mt-6 px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 hover:scale-105 transform transition-transform duration-300"
                      onClick={() => setShowSuccessPopup(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MintToken;
