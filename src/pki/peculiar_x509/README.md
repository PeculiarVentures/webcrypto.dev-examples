# Overview

[@peculiar/x509](https://github.com/PeculiarVentures/x509) is an object-oriented Typescript library that provides a higher-level API for working with X.509 certificates and related data structures.

![npm](https://img.shields.io/npm/dw/@peculiar/x509)
![npm (scoped)](https://img.shields.io/npm/v/@peculiar/x509)

### Samples

| Sample             |	Description                              |
|--------------------|-------------------------------------------|
| [X509 certificate creation](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_x509/create_cert.ts) | Demonstrates how to generate a self-signed X.509 certificate using RSA encryption, and display the PEM encoded certificate and decoded certificate information. |
| [X509 certificate reading](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_x509/read_cert.ts) | Demonstrates how to parse and retrieve information from a PEM-encoded X.509 certificate. |
| [PKCS10 certificate request creation](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_x509/create_cert_req.ts) | Demonstrates how to generate an ECDSA key, create a PKCS10 certificate request, and output it in both PEM and ASN.1 encoding formats. |
| [Certificate Revocation List creation](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_x509/create_crl.ts) | Demonstrates how to generate an ECDSA key, create a certificate revocation list (CRL) using that key, and output the CRL in PEM format and its ASN.1 encoding. |
| [X509 certificate chain building](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_x509/chain.ts) | Demonstrates how to build certificate chain using a certificate list retrieved from the CMS (Cryptographic Message Syntax) structure, and output the chain in PEM format. |
| [Convert PEM to DER](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_x509/pem_to_der.ts) | Demonstrates how to convert a PEM certificate to DER format. |
