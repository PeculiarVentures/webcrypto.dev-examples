# webcrypto-liner

![npm](https://img.shields.io/npm/dw/webcrypto-liner)
![npm (scoped)](https://img.shields.io/npm/v/webcrypto-liner)

Source: https://github.com/PeculiarVentures/webcrypto-liner

## Examples

Standard WebCrypto mechanisms:

- [SHA digest](sha.ts)
- [AES-CBC key generation and data encryption](aes_cbc.ts)
- [RSASSA-PKCS1-v1_5 key generation and signing](rsa_ssa.ts)
- [RSA-OAEP key generation and secret key wrapping](rsa_oaep.ts)
- [ECDSA key generation and signing](ecdsa.ts)
- [ECDH key generation and key deriving](ecdh.ts)

Non-standard WebCrypto mechanisms:

- [Ed25519 key generation and data signing](eddsa.ts)
- [RSAES-PKCS1-v1_5 key generation and secret key wrapping](rsa_oaep.ts)
- [AES-ECB key generation and data encryption](aes_ecb.ts)