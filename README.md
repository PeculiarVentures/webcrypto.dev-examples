# lib-examples

This repository contains examples for PeculiarVentures libraries

List:

- Crypto engines

  These modules implement WebCrypto API and use different crypto engines

  - [**@peculiar/webcrypto**](src/crypto/peculiar_webcrypto/README.md) (NodeJS Crypto API)
  - **webcrypto-liner** (Browser Crypto API + JS implementations)
  - **node-webcrypto-p11** (PKCS#11)
    - **graphene-pk11** (OOP representation of PKCS#11)
    - **pkcs11js** (NodeJS C++ plugin for PKCS#11)
    - **pvpkcs11** (PKCS#11 implementation for OS Crypto API Win/MacOS)

- PKI
  - **asn1js**
  - **@peculiar/asn1**
  - **pkijs**
  - **@peculiar/x509**

- XML
  - **xmldsigjs**
  - **xadesjs**

- PDF
  - **@peculiarventures/pdf**

## Run examples

You can use your Terminal to run any examples.

First, you need to install all required dependencies.

```
yarn
```

Use this command to run an example.

```
npx ts-node ./path/to/example.ts
```

**Examples:**
```
npx ts-node ./src/crypto/peculiar_webcrypto/rsa_ssa.ts
```