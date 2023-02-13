import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";

const crypto = new Crypto();

async function main() {
  // Generate an ECDSA key
  const algorithm = {
    name: "ECDSA",
    hash: "SHA-256",
    namedCurve: "P-256",
  };
  const keys = await crypto.subtle.generateKey(algorithm, false, ["sign", "verify"]);

  // Create a PKCS10 certificate request
  const certReq = await x509.Pkcs10CertificateRequestGenerator.create({
    name: "CN=Test certificate, O=Test, L=US",
    keys,
    signingAlgorithm: algorithm,
    extensions: [
      new x509.SubjectAlternativeNameExtension([
        { type: "dns", value: "some.domain.com" },
      ]),
    ],
  }, crypto);

  // Output the PKCS10 certificate request in PEM format
  console.log(certReq.toString("pem"));
  // -----BEGIN CERTIFICATE REQUEST-----
  // MIIBHzCBxgIBADA3MRkwFwYDVQQDExBUZXN0IGNlcnRpZmljYXRlMQ0wCwYDVQQK
  // EwRUZXN0MQswCQYDVQQHEwJVUzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABJV5
  // AtILSlZBqlvX4YFPqHWnccQ8Fo2Egb5WyN38qlhxP77M31dWZSnRNv2ppdBF7sFI
  // k/U6UZYKu4D4EDctO7GgLTArBgkqhkiG9w0BCQ4xHjAcMBoGA1UdEQQTMBGCD3Nv
  // bWUuZG9tYWluLmNvbTAKBggqhkjOPQQDAgNIADBFAiBys+rSrr9z0wxW9bSaQP1R
  // gs4POE+2o7+JqsDPAkg9IQIhAP2DZRA1IlLdJOYWWhxi35CrjuEkA7x9etWs8EMB
  // QMlk
  // -----END CERTIFICATE REQUEST-----

  // Output the PKCS10 certificate request instance to a string of its ASN.1 encoding
  console.log(certReq.toString("asn"));
  // SEQUENCE :
  //   SEQUENCE :
  //     INTEGER : 0
  //     SEQUENCE :
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.3
  //           PrintableString : 'Test certificate'
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.10
  //           PrintableString : 'Test'
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.7
  //           PrintableString : 'US'
  //     SEQUENCE :
  //       SEQUENCE :
  //         OBJECT IDENTIFIER : 1.2.840.10045.2.1
  //         OBJECT IDENTIFIER : 1.2.840.10045.3.1.7
  //       BIT STRING : 00000100100101010111100100000010...000000110111001011010011101110110001
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
