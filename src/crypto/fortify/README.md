# Overview
[fortify](https://github.com/PeculiarVentures/fortify) enables web applications to use smart cards, local certificate stores and do certificate enrollment.

In order to run these examples, you need to download and install the Fortify application from the website https://fortifyapp.com/.

### Samples

| Sample             |	Description                              |
|--------------------|-------------------------------------------|
| [Import Certificate](cert_import.ts) | Demonstrates how to import a certificate from PEM format and add it to a token. |
| [List of Certificates](cert_list.ts) | Demonstrates how to read all certificates on a token, display information about each certificate, and determine if there is a private key for each certificate. |
| [Create Certificate Request](cert_req.ts) | Demonstrates how to generate keys, create a certificate request, display the request on the screen in PEM format, and save the keys to the token. |
| [Sign Data](cert_sign.ts) | Demonstrates how to retrieve a certificate with its private key from a token, sign data, and verify the signature. |
