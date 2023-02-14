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

  // Create a PKCS10 certificate request
  const pkcs10 = new pkijs.CertificationRequest();
  pkcs10.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({
    type: "2.5.4.3", // CN
    value: new asn1js.Utf8String({ value: "Test" })
  }));

  await pkcs10.subjectPublicKeyInfo.importKey(keys.publicKey);

  // Create extensionRequest
  const attrExtensionRequest = new pkijs.Attribute({
    type: "1.2.840.113549.1.9.14", // pkcs-9-at-extensionRequest
    values: [(new pkijs.Extensions({
      extensions: [
        new pkijs.Extension({
          extnID: "2.5.29.17", // id-ce-subjectAltName
          critical: false,
          extnValue: new pkijs.GeneralNames({
            names: [
              new pkijs.GeneralName({ // email
                type: 1,
                value: "email@address.com"
              }),
              new pkijs.GeneralName({ // domain
                type: 2,
                value: "www.domain.com"
              }),
            ]
          }).toSchema().toBER(false),
        }),
        new pkijs.Extension({
          extnID: "1.2.840.113549.1.9.7", // pkcs-9-at-challengePassword
          critical: false,
          extnValue: (new asn1js.PrintableString({ value: "passwordChallenge" })).toBER(false),
        })
      ]
    })).toSchema()]
  });

  pkcs10.attributes = [attrExtensionRequest];

  // Sign the PKCS#10 request
  await pkcs10.sign(keys.privateKey, algorithm.hash);

  // Output the certificate request as a set of bytes in ASN.1 encoding
  const raw = pkcs10.toSchema(true).toBER();
  console.log(raw); // ArrayBuffer <30 82 01 2c 30 81 d2 02 01 00 30 0f 31 0d 30 ... 204 more bytes>
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
