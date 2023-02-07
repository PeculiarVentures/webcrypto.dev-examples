# Overview

[pkcs11js](https://github.com/PeculiarVentures/pkcs11js) is a Typescript/Javascript binding for PKCS#11, enables Node applications to interact with PKCS#11 implementations such as provided by smart cards and hardware security modules.

![npm](https://img.shields.io/npm/dw/pkcs11js)
![npm (scoped)](https://img.shields.io/npm/v/pkcs11js)

Source: https://github.com/PeculiarVentures/pkcs11js

## Environment

These examples require any PKCS#11 library on your computer. I use SoftHSM for these examples. You can install it on Mac using this command.

```sh
brew install softhsm
softhsm2-util --init-token --so-pin "12345" --pin "12345" --slot 0 --label "My slot 0"
```

## Samples

| Sample             |	Description                              |
|--------------------|-------------------------------------------|
| [RSA key generation and data signing](rsa_sign.ts) | Demonstrates how to generate an RSA key pair, sign some data with the private key, and verify the signed data with the public key, interacting with a software HSM through the PKCS#11 API. |
| [Certificate importing](cert_import.ts) | Demonstrates how to create an X509 certificate object on the HSM. |
| [Key and Certificate getting](cert_get.ts) | Demonstrates searching for objects on a token based on a specified CKA_ID attribute value and, if found, outputs their type names. |
