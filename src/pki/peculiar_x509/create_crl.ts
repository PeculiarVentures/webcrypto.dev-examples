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

  // Create a CRL
  const crl = await x509.X509CrlGenerator.create({
    issuer: "CN=Test certificate, O=Test, L=US",
    nextUpdate: new Date("2022-02-13"),
    signingKey: keys.privateKey,
    signingAlgorithm: algorithm,
    entries: [
      {
        serialNumber: "01",
        revocationDate: new Date("2022-02-13"),
        reason: x509.X509CrlReason.certificateHold,
      },
    ],
  }, crypto);

  // Output the CRL in PEM format
  console.log(crl.toString("pem"));
  // -----BEGIN CRL-----
  // MIHjMIGKAgEBMAoGCCqGSM49BAMCMDcxGTAXBgNVBAMTEFRlc3QgY2VydGlmaWNh
  // dGUxDTALBgNVBAoTBFRlc3QxCzAJBgNVBAcTAlVTFw0yMzAyMTMyMDAzMTlaFw0y
  // MjAyMTMwMDAwMDBaMCIwIAIBARcNMjIwMjEzMDAwMDAwWjAMMAoGA1UdFQQDCgEG
  // MAoGCCqGSM49BAMCA0gAMEUCICeyDZ2AijMRhMQCSzuf4lz484tqbzIs0jDy5+g3
  // DzBbAiEAm1KjBmHwpZ8kKc8K6pMM7zbBQ1y1ooDYm0FEu/4IBuY=
  // -----END CRL-----

  // Output the CRL instance to a string of its ASN.1 encoding
  console.log(crl.toString("asn"));
  // SEQUENCE :
  //   SEQUENCE :
  //     INTEGER : 1
  //     SEQUENCE :
  //       OBJECT IDENTIFIER : 1.2.840.10045.4.3.2
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
  //     UTCTime : 2023-02-13T20:03:19.000Z
  //     UTCTime : 2022-02-13T00:00:00.000Z
  //     SEQUENCE :
  //       SEQUENCE :
  //         INTEGER : 1
  //         UTCTime : 2022-02-13T00:00:00.000Z
  //         SEQUENCE :
  //           SEQUENCE :
  //             OBJECT IDENTIFIER : 2.5.29.21
  //             OCTET STRING :
  //               ENUMERATED : 6
  //   SEQUENCE :
  //     OBJECT IDENTIFIER : 1.2.840.10045.4.3.2
  //   BIT STRING :
  //     SEQUENCE :
  //       INTEGER : 17954793841228901881814446343888817340421378500879084970172356051293277466715
  //       INTEGER : 70254498146446613286704785905063806225299258727665354697409541371674325681894
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
