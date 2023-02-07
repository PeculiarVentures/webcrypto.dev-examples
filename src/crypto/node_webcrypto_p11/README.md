# Overview
[node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11) Provides a binding between the PKCS#11 API and the WebCrypto API, making it easy to add support for PKCS#11 to any application built around the WebCrypto API.

![npm](https://img.shields.io/npm/dw/node-webcrypto-p11)
![npm (scoped)](https://img.shields.io/npm/v/node-webcrypto-p11)


## Examples

- [SHA digest](sha.ts)
- [AES-CBC key generation and data encryption](aes_cbc.ts)
- [RSASSA-PKCS1-v1_5 key generation and signing](rsa_ssa.ts)
- [RSA-OAEP key generation and secret key wrapping](rsa_oaep.ts)
- [ECDSA key generation and signing](ecdsa.ts)
- [ECDH key generation and key deriving](ecdh.ts)
- [Getting all keys from the token](key_storage_list.ts)
- [Creating an RSA key and adding it to the token](key_storage_add.ts)
- [Getting all certificates with private keys from the token](cert_storage_list.ts)
- [Importing a certificate and adding it to the token](cert_storage_add.ts)
