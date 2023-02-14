import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  // Create certificate
  const certificate = new pkijs.Certificate();
  certificate.version = 2;
  certificate.serialNumber = new asn1js.Integer({ value: 1 });
  certificate.issuer.typesAndValues.push(new pkijs.AttributeTypeAndValue({
    type: "2.5.4.3", // Common name
    value: new asn1js.BmpString({ value: "Test" })
  }));
  certificate.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({
    type: "2.5.4.3", // Common name
    value: new asn1js.BmpString({ value: "Test" })
  }));

  // Set a validity period of 1 year 
  certificate.notBefore.value = new Date();
  const notAfter = new Date();
  notAfter.setUTCFullYear(notAfter.getUTCFullYear() + 1);
  certificate.notAfter.value = notAfter;

  certificate.extensions = []; // Extensions are not a part of certificate by default, it's an optional array

  // "BasicConstraints" extension
  const basicConstr = new pkijs.BasicConstraints({
    cA: false,
  });
  certificate.extensions.push(new pkijs.Extension({
    extnID: "2.5.29.19",
    critical: true,
    extnValue: basicConstr.toSchema().toBER(false),
    parsedValue: basicConstr // Parsed value for well-known extensions
  }));

  // "KeyUsage" extension
  const bitArray = new ArrayBuffer(1);
  const bitView = new Uint8Array(bitArray);
  bitView[0] |= 0x01; // Key usage "digitalSignature" flag
  bitView[0] |= 0x02; // Key usage "nonRepudiation" flag
  const keyUsage = new asn1js.BitString({ valueHex: bitArray });
  certificate.extensions.push(new pkijs.Extension({
    extnID: "2.5.29.15",
    critical: true,
    extnValue: keyUsage.toBER(false),
    parsedValue: keyUsage // Parsed value for well-known extensions
  }));

  // Generate RSA key pair
  const algorithm = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    publicExponent: new Uint8Array([1, 0, 1]),
    modulusLength: 2048,
  };
  const keys = await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);

  // Exporting public key into "subjectPublicKeyInfo" value of certificate
  await certificate.subjectPublicKeyInfo.importKey(keys.publicKey);

  // Signing final certificate
  await certificate.sign(keys.privateKey, algorithm.hash);

  // Output the certificate in ASN.1 encoded raw
  const raw = certificate.toSchema().toBER();
  console.log(raw); // ArrayBuffer <30 82 02 bd 30 82 01 a7 a0 03 02 01 02 02 01 0 ... 605 more bytes>
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
