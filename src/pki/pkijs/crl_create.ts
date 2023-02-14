import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  // Generate ECDSA key pair
  const algorithm = {
    name: "ECDSA",
    hash: "SHA-256",
    namedCurve: "P-256",
  };
  const keys = await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);

  // Create certificate
  const crl = new pkijs.CertificateRevocationList();
  crl.nextUpdate = new pkijs.Time({
    type: pkijs.TimeType.UTCTime,
    value: new Date("2023-02-14"),
  });
  crl.issuer.typesAndValues.push(new pkijs.AttributeTypeAndValue({
    type: "2.5.4.3", // Common name
    value: new asn1js.BmpString({ value: "Test" })
  }));
  crl.revokedCertificates = [
    new pkijs.RevokedCertificate({
      revocationDate: new pkijs.Time({
        type: pkijs.TimeType.UTCTime,
        value: new Date("2023-02-14"),
      }),
      userCertificate: new asn1js.Integer({ value: 1 }),
    }),
    new pkijs.RevokedCertificate({
      revocationDate: new pkijs.Time({
        type: pkijs.TimeType.UTCTime,
        value: new Date("2023-02-14"),
      }),
      userCertificate: new asn1js.Integer({ value: 2 }),
    }),
    new pkijs.RevokedCertificate({
      revocationDate: new pkijs.Time({
        type: pkijs.TimeType.UTCTime,
        value: new Date("2023-02-14"),
      }),
      userCertificate: new asn1js.Integer({ value: 3 }),
    }),
  ];
  // Sign the CRL
  await crl.sign(keys.privateKey, algorithm.hash);

  // Output the CRL as a set of bytes in ASN.1 encoding
  const raw = crl.toSchema().toBER();
  console.log(raw); // ArrayBuffer <30 81 d5 30 7d 30 0a 06 08 2a 86 48 ce 3d 04 03 02 30 13 31 ... 116 more bytes>
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
