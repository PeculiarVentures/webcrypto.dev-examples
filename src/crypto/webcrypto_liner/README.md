# Overview
[webcrypto-liner](https://github.com/PeculiarVentures/webcrypto-liner) is a polyfill for the WebCrypto API that can be used when browsers do not support the API, allowing WebCrypto applications to work even if native implementations are not available. It also provides support for some algorithms that are needed for interoperability with existing systems that are not supported by the WebCrypto standard.

![npm](https://img.shields.io/npm/dw/webcrypto-liner)
![npm (scoped)](https://img.shields.io/npm/v/webcrypto-liner)


#### Standard WebCrypto mechanisms
| Sample             |	Description                              |
|---------------------|------------------------------------------|
| [AES-CBC key generation and data encryption](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/aes_cbc.ts)	|  Demonstrates how to perform AES encryption and decryption. |
| [Create SHA message digests](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/sha.ts)	|  Demonstrates how to compute message digests using SHA-1, SHA-256, SHA-384, and SHA-512. |
|[RSASSA-PKCS1-v1_5 key generation and signing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/rsa_ssa.ts) |  Demonstrates how to generate RSA key pairs then signs and verifies.|
|[RSA key generation and secret key wrapping](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/rsa_oaep.ts)| Demonstrates how to generate RSA and AES keys, wrap and unwrap a secret key, and export a public key.|
|[ECDSA key generation and signing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/ecdsa.ts)| Demonstrates how to  generate and export a public key, sign data with a private key, and verify the signature using Elliptic Curve Digital Signature Algorithm (ECDSA) with SHA-256.|
|[ECDH key generation and key deriving](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/ecdh.ts)| Demonstrates how to do key agreement based on Elliptic Curve Diffie-Hellman (ECDH) for secure key exchange between two parties.|

#### Non-Standard WebCrypto mechanisms

| Sample             |	Description                              |
|---------------------|------------------------------------------|
| [Ed25519 Key Generation and Data Signing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/eddsa.ts) | Demonstrates how to generate an Ed25519 key pair and use it to sign data |
| [RSAES-PKCS1-v1_5 Key Generation and Secret Key Wrapping](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/rsa_oaep.ts) | Demonstrates how to generate an RSAES-PKCS1-v1_5 key pair and use it to wrap and unwrap a secret key |
| [AES-ECB Key Generation and Data Encryption](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/webcrypto_liner/aes_ecb.ts) | Demonstrates how to generate an AES-ECB key and use it to encrypt and decrypt data |
