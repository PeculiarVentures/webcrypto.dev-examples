# Overview

[pkijs](https://github.com/PeculiarVentures/PKI.js) is a low level Typescript library that provides support for working with X.509 certificates and related data structures. Chances are you should be using [@peculiar/x509](src/pki/peculiar_x509/README.md) instead.

![npm](https://img.shields.io/npm/dw/pkijs)
![npm (scoped)](https://img.shields.io/npm/v/pkijs)

### Samples

| Sample             |	Description                              |
|--------------------|-------------------------------------------|
 | [Creating an X509 Certificate](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/pkijs/cert_create.ts) | Demonstrates how to create a self-signed certificate for document signing, with a validity of 1 year. |
 | [Reading an X509 Certificate](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/pkijs/cert_read.ts) | Demonstrates how to parse and retrieve information from a BASE64-encoded X.509 certificate. |
 | [Creating a PKCS10 Certificate Signing Request](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/pkijs/pkcs10_create.ts) | Demonstrates how to create a PKCS10 certificate request with SubjectAlternativeName and ChallengePassword and output the byte set in ASN.1 encoding. |
 | [Creating a Certificate Revocation List (CRL)](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/pkijs/crl_create.ts) | Demonstrates how to create a CRL with two revoked certificates and encode the result into a byte set in ASN.1 format. |
 | [Creating an OCSP Request](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/pkijs/ocsp_req_create.ts) | Demonstrates how to create an OCSP request for a specified certificate and encode the result into a byte set in ASN.1 format. |
 | [Reading an OCSP Response](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/pkijs/ocsp_resp_read.ts) | Demonstrates how to read an OCSP response and verify the status for a given certificate. |
 | [Signing Data using CMS SignedData](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/pkijs/signed_data_sign.ts) |  |
 | [Verifying the Signature of CMS SignedData](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/pkijs/signed_data_verify.ts) |  |