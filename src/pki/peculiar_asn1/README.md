# Overview
[@peculiar/asn1](https://github.com/PeculiarVentures/asn1-schema) is an object-oriented Typescript library that provides support for parsing and serializing ASN.1 data structures.

![npm](https://img.shields.io/npm/dw/@peculiar/asn1-schema)
![npm (scoped)](https://img.shields.io/npm/v/@peculiar/asn1-schema)


### Samples

| Sample             |	Description                              |
|--------------------|-------------------------------------------|
| [ASN.1 data creation](create.ts) | Demonstrates how to create a `CertificateTemplate` ASN.1 schema, serialize and convert the object to its ASN.1 encoding string representation using the @peculiar/asn1-schema library. |
| [ASN.1 data editing](edit.ts) | Demonstrates how to to create a `CertificateTemplate` ASN.1 schema, convert a binary ASN.1 encoding to a `CertificateTemplate` object, update its properties, and convert it back to binary ASN.1 encoding. |
| [Microsoft Certificate Template parsing](schema_cert.ts.ts) | Demonstrates how to parse and modify a binary ASN.1 encoded `CertificateTemplate` using schema from `@peculiar/asn1-x509-microsoft` library, and then convert it to a string and serialize it back to its binary representation. |
| [Certificate parsing](schema_cert_template.ts.ts) | Demonstrates how to parse a binary ASN.1 encoded `Certificate` using schema from `@peculiar/asn1-x509` library and display the decoded certificate information. |
