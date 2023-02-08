# Overview
[node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11) Provides a binding between the PKCS#11 API and the WebCrypto API, making it easy to add support for PKCS#11 to any application built around the WebCrypto API.

![npm](https://img.shields.io/npm/dw/node-webcrypto-p11)
![npm (scoped)](https://img.shields.io/npm/v/node-webcrypto-p11)

### Samples


| Sample Name                                               | Description                                                            |
|-----------------------------------------------------------|------------------------------------------------------------------------|
| [SHA digest](sha.ts)                                               | Demonstrates SHA digest calculation                                    |
| [AES-CBC key generation and data encryption](aes_cbc.ts)               | Demonstrates AES-CBC key generation and data encryption                |
| [RSASSA-PKCS1-v1_5 key generation and signing](rsa_ssa.ts)             | Demonstrates RSASSA-PKCS1-v1_5 key generation and signing              |
| [RSA-OAEP key generation and secret key wrapping](rsa_oaep.ts)          | Demonstrates RSA-OAEP key generation and secret key wrapping           |
| [ECDSA key generation and signing](ecdsa.ts)                        | Demonstrates ECDSA key generation and signing                          |
| [ECDH key generation and key deriving](ecdh.ts)                     | Demonstrates ECDH key generation and key deriving                      |
| [Getting all keys from the token](key_storage_list.ts)                          | Demonstrates getting all keys from the token                           |
| [Creating an RSA key and adding it to the token](key_storage_add.ts)            | Demonstrates creating an RSA key and adding it to the token            
| [Getting all certificates with private keys from the token](cert_storage_list.ts)| Demonstrates getting all certificates with private keys from the token|
| [Importing a certificate and adding it to the token](cert_storage_add.ts)        | Demonstrates importing a certificate and adding it to the token        |
