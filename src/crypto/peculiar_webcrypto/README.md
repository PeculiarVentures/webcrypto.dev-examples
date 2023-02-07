# Overview
[@peculiar/webcrypto](https://github.com/PeculiarVentures/webcrypto) is a WebCrypto polyfill based on the NodeJS native crypto implementation that adds support for several cryptographic algorithms not included in the WebCrypto standard, enabling interoperability with existing systems that use those algorithms.

#### Standard WebCrypto mechanisms
| Sample             |	Description                              |
|---------------------|------------------------------------------|
| [AES-CBC key generation and data encryption](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/aes_cbc.ts)	| Uses the @peculiar/webcrypto library to perform AES encryption and decryption. |
| [Create SHA message digests](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/aes_cbc.ts)	| Uses the @peculiar/webcrypto to compute message digests using SHA-1, SHA-256, SHA-384, and SHA-512. |
|[RSASSA-PKCS1-v1_5 key generation and signing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/rsa_ssa.ts) | Uses the @peculiar/webcrypto library to generate RSA key pairs then signs and verifies.|
|[RSA key generation and secret key wrapping](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/rsa_oaep.ts)|Uses the @peculiar/webcrypto to generate RSA and AES keys, wrap and unwrap a secret key, and export a public key.|
|[ECDSA key generation and signing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/ecdsa.ts)|The code uses the @peculiar/webcrypto library to generate and export a public key, sign data with a private key, and verify the signature using Elliptic Curve Digital Signature Algorithm (ECDSA) with SHA-256.|
|[ECDH key generation and key deriving](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/ecdh.ts)|This code uses the @peculiar/webcrypto library to demonstrate a key agreement algorithm based on Elliptic Curve Diffie-Hellman (ECDH) for secure key exchange between two parties.|

#### Non-Standard WebCrypto mechanisms

| Sample             |	Description                              |
|---------------------|------------------------------------------|
| [Ed25519 Key Generation and Data Signing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/eddsa.ts) | Demonstrates how to generate an Ed25519 key pair and use it to sign data |
| [X25519 Key Generation and Key Derivation](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/ecdh_es.ts) | Demonstrates how to generate an X25519 key pair and use it to derive a shared secret | 
| [RSAES-PKCS1-v1_5 Key Generation and Secret Key Wrapping](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/rsa_oaep.ts) | Demonstrates how to generate an RSAES-PKCS1-v1_5 key pair and use it to wrap and unwrap a secret key |
| [AES-ECB Key Generation and Data Encryption](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/crypto/peculiar_webcrypto/aes_ecb.ts) | Demonstrates how to generate an AES-ECB key and use it to encrypt and decrypt data |
