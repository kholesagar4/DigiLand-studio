export const schemaVersionRegex = /^\d{1,5}(?=.*[0-9])(?:\.\d{1,5})?(?:\.\d{1,5})?$/gm

export const apiStatusCodes = {
    API_STATUS_SUCCESS : 200,
    API_STATUS_CREATED : 201,
    API_STATUS_BAD_REQUEST : 400,
    API_STATUS_UNAUTHORIZED : 401,
    API_STATUS_NOT_FOUND : 404
}

export const nft = {
    TOKEN_ID: "1",
    CHAIN: "polygon-amoy",
    CONTRACT_ADDRESS: "0xA82f7a7da4BDBf09F697167deD4e622dBdd60541",
}

export const verifiableCredential = "VerifiableCredential"

export const proofPurpose = "assertionMethod"

export const proofType = "EthereumEip712Signature2021"

export const proofValue =
"0x4b2cfb2bef5e6138d46ede4c3afde89bba6a7a5248399da17702c625187c71cf4d9a44474115305bb81786fb3a7078939014e83e8bb3d159b3c362e8e2e5b0a81c"

export const domain = {
    NAME: "Crossmint",
    VERSION: "0.1",
    CHAINID: 4,
    VERIFYING_CONTRACT: "0xD8393a735e8b7B6E199db9A537cf27C61Aa74954",
}

export const primaryType = "VerifiableCredential"

export const issuerId = "did:polygon-amoy:0xd1B3dF611866B33A481E44B3f3ea75FfB840D63B"

export const credentialSchema = "https://www.w3.org/2018/credentials/v1"

export const verificationMethod = "did:polygon-amoy:0xd1B3dF611866B33A481E44B3f3ea75FfB840D63B#evmAddress"