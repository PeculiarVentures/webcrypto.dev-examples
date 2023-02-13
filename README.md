# Overview

https://webcrypto.dev is a collection of applied cryptography and x.509 certificate related libraries by Peculiar Ventures, a technology company dedicated to making the process of building modern, usable, and secure applications and services easy.

With years of experience in this field, we have created a suite of popular libraries that make it easier for developers to integrate these technologies into their projects. These libraries are used by companies of all sizes, from large enterprises to small startups.

Some of the well-known companies that use our libraries include Microsoft, Google, CloudFlare, Facebook, WhatsApp, and many more. 

This repository contains examples for some of our most popular libraries. Whether you're a seasoned developer or just starting out, you'll find that our libraries likley have everything you need to quickly integrate these technologies into your own projects.

So dive in and explore the different libraries available in this repository. We're confident that you'll find what you need to take your projects to the next level, just like many of the companies already using our libraries.

# Libraries

#### Cryptographic Engines
The cryptographic engines are the backbone of applications that utilize these technologies. To ensure code portability, we standardize on using the WebCrypto API and PKCS#11 to access well-established native cryptographic implementations. Our crypto engines simplify the integration process, making it convenient and effortless for you to add robust cryptographic functionality to your projects.


| Library             |	Description                              |
|---------------------|------------------------------------------|
| [@peculiar/webcrypto](src/crypto/peculiar_webcrypto/README.md) | A WebCrypto polyfill based on the NodeJS native crypto implementation that adds support for several cryptographic algorithms not included in the WebCrypto standard, enabling interoperability with existing systems that use those algorithms. |
| [webcrypto-liner](src/crypto/webcrypto_liner/README.md)  | A polyfill for the WebCrypto API that can be used when browsers do not support the API, allowing WebCrypto applications to work even if native implementations are not available. It also provides support for some algorithms that are needed for interoperability with existing systems that are not supported by the WebCrypto standard. |
| [node-webcrypto-p11](src/crypto/node_webcrypto_p11/README.md) | Provides a binding between the PKCS#11 API and the WebCrypto API, making it easy to add support for PKCS#11 to any application built around the WebCrypto API. |
| [pkcs11js](src/crypto/pkcs11js/README.md) | Typescript/Javascript binding for PKCS#11, enables Node applications to interact with PKCS#11 implementations such as provided by smart cards and hardware security modules. |
| @pvpkcs11 | PKCS#11 implementation that makes it possible to access the operating system and browser implementations of cryptography and certificate stores from a single API, making it easy to build cross-platform applications that use these technologies. |


#### Public Key Infrastructure (PKI)
The ASN.1 and X.509 libraries are essential building blocks for many security-related applications, including web-based applications. That's why we have created simple, easy-to-use libraries for working with these technologies in both browser and Node.js environments. These libraries make it convenient and effortless for you to add certificate handling capabilities to your projects, simplifying the integration process.


| Library             |	Description                              |
|---------------------|------------------------------------------|
| [asn1js](src/pki/asn1js/README.md)	| A low level Typescript library for parsing and serializing ASN.1 data structures.|
| [@peculiar/asn1](src/pki/peculiar_asn1/README.md)	| An object-oriented Typescript library that provides support for parsing and serializing ASN.1 data structures. | 
| pkijs	| A low level Typescript library that provides support for working with X.509 certificates and related data structures. |
| @peculiar/x509 | An object-oriented Typescript library that provides a higher-level API for working with X.509 certificates and related data structures. |


#### XML Security
The XML libraries are critical components for many security-related applications, including web-based applications. To simplify the process of working with XML, we have created libraries specifically designed for encoding, decoding, and signing XML data structures. These libraries simplify the integration process, making it convenient and effortless for you to add robust XML handling capabilities to your projects.

| Library             |	Description                              |
|---------------------|------------------------------------------|
|xmldsigjs	| A Typescript library that provides support for signing and validating XML data structures using the XML Digital Signature standard. |
|xadesjs		| A Typescript library that provides support for signing and validating XML data structures using the XAdES (XML Advanced Electronic Signatures) standard. | 


#### Portable Document Formant (PDF)
Our PDF libraries provide a convenient and easy-to-use solution for creating, manipulating, and working with PDF files, with a focus on signing and encryption scenarios. These libraries simplify the integration process and allow you to add PDF handling capabilities to your projects with ease.

| Library             |	Description                              |
|---------------------|------------------------------------------|
| @peculiarventures/pdf | A Typescript library for creating and working with a PDF files focused on signing, and encryption scenarios. |

# Running The Examples

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
