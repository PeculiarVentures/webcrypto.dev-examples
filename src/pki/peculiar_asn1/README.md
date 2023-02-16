# Overview
[@peculiar/asn1](https://github.com/PeculiarVentures/asn1-schema) is an object-oriented Typescript library that provides support for parsing and serializing ASN.1 data structures.

![npm](https://img.shields.io/npm/dw/@peculiar/asn1-schema)
![npm (scoped)](https://img.shields.io/npm/v/@peculiar/asn1-schema)


### Samples

| Sample             |	Description                              |
|--------------------|-------------------------------------------|
| [ASN.1 data creation](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_asn1/create.ts) | Demonstrates how to create a `CertificateTemplate` ASN.1 schema, serialize and convert the object to its ASN.1 encoding string representation using the @peculiar/asn1-schema library. |
| [ASN.1 data editing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_asn1/edit.ts) | Demonstrates how to to create a `CertificateTemplate` ASN.1 schema, convert a binary ASN.1 encoding to a `CertificateTemplate` object, update its properties, and convert it back to binary ASN.1 encoding. |
| [Microsoft Certificate Template extension parsing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_asn1/schema_cert_template.ts) | Demonstrates how to parse and modify a binary ASN.1 encoded `CertificateTemplate` using schema from `@peculiar/asn1-x509-microsoft` library, and then convert it to a string and serialize it back to its binary representation. |
| [Certificate parsing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_asn1/schema_cert.ts) | Demonstrates how to parse a binary ASN.1 encoded `Certificate` using schema from `@peculiar/asn1-x509` library and display the decoded certificate information. |
| [PKCS10 Certificate Request parsing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_asn1/schema_cert_req.ts) | Demonstrates how to parse a binary ASN.1 encoded `CertificationRequest` using schema from `@peculiar/asn1-csr` library and display the decoded certification request information. |
| [CRL parsing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_asn1/schema_cert_req.ts) | Demonstrates how to parse a binary ASN.1 encoded `CertificateList` using schema from `@peculiar/asn1-x509` library and display the decoded CRL information. |
| [OCSP parsing](https://github.com/PeculiarVentures/webcrypto.dev-examples/blob/main/src/pki/peculiar_asn1/schema_ocsp.ts) | Demonstrates how to parse a binary ASN.1 encoded `OCSPResponse` using schema from `@peculiar/asn1-ocsp` library and display the decoded OCSP response information. |
