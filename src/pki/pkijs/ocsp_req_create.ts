import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const pemLeafCert = [
    "MIICzzCCAbegAwIBAgIBATANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDExRJbnRl",
    "cm1lZGlhdGUgQ0EgIzIuMTAeFw0xOTEyMzEyMzAwMDBaFw0yMDAxMDEyMzAwMDBa",
    "MBQxEjAQBgNVBAMTCUNsaWVudCAjMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC",
    "AQoCggEBAIu5ZjvLho2gsJOaCSe5wv2IziMlbOtBMZUyfZaebeFCv1VZX3avsSBh",
    "eCyroQ3DmXDs50mflTS591jJ3lU/ovGGz2brN74g/A8u0rFoL4HqKKXlApaXGsde",
    "u6Odoe8aPL0iOw2MLuIJsnEri2N3hFg88P/KtT4WIAp4i77Q2zzTBxAzAwNtEDZ8",
    "JvVZedagDVDfJJPMMP+Vg0g/fR2tBahVBZkZXRb8t5wYaeebr6r9T2bwgss+ymoU",
    "R2uoscwq88J24j804WAVt3AELvAC5M9iUCVJFT9nDaAHR0tmks2RV9L7fgpvXTpg",
    "WpvBtdVcKlQ4oC3BbX986v80oHaiEY8CAwEAAaMhMB8wHQYDVR0OBBYEFJarLvql",
    "RMRaBcX26o+13k/BFapTMA0GCSqGSIb3DQEBCwUAA4IBAQBcnknl/2R4ARimA8v6",
    "RReW+i9rhJroSY8LbWwhXOtIaGTrEvxu0JRXn0ATprnzvIfmuLUkK8ECNmXr3hob",
    "riM918xJiQkpv+NErinZnkf3OorwsTUJwAzLw4uaYJDq+goJIpwpQf1ohO6aelA2",
    "Xud8tVpgOMM8cuYRc9qxHffF4gc7sUCn6XPkAFfphu3/1qqis6mVOinombnyEUJW",
    "ivpoNM7ZJbPrqrPrx81SzOQgKaCFwRa0znjAVUCNQ77fAwbsktY5CO4v8jwHu3u6",
    "PLlTfVJ5g27vhlHZBhuYdEzjY1+QNBHScNvezz854cN0GkJLt/66tJFJjJ3zwKKs",
    "iyko",
  ].join("");
  const pemCACert = [
    "MIIC2DCCAcCgAwIBAgIBATANBgkqhkiG9w0BAQsFADAdMRswGQYDVQQDExJJbnRl",
    "cm1lZGlhdGUgQ0EgIzIwHhcNMTkxMjMxMjMwMDAwWhcNMjAwMTAxMjMwMDAwWjAf",
    "MR0wGwYDVQQDExRJbnRlcm1lZGlhdGUgQ0EgIzIuMTCCASIwDQYJKoZIhvcNAQEB",
    "BQADggEPADCCAQoCggEBAMKUa3JjCIV4HlyrK1EhA8BA3yJHB3MaHeyGaV5vKR/J",
    "7I1XIyluW3TKOAeN8oMRICQutbcY8VMKwgtNu5joXx9LVkX/H9CKzhbump08SKuX",
    "MO6McDW0TaPeSL9eY1X8r+utSl/wbbU4U5C5lQhSeIYEigSbxddkmfFuRBlE1DxG",
    "r7/CVmSfaLkoWbjmJW7lIud1+M3K7Tfn14WMfdAAuwP0icM2eTP1D0DSuuD0Bkhu",
    "Whcmh1HpVieGdSkne5ZZmOkG6rtl+BXckg9dnt8SLOML1ssdRMRPtBgO36KyJBpv",
    "vUm4YOMMsh77h8KiZkuVC87iattxSIouptjxSixrHVcCAwEAAaMhMB8wHQYDVR0O",
    "BBYEFPieFIVqRudgQ9GFOxuIfjKGiI5DMA0GCSqGSIb3DQEBCwUAA4IBAQCTJd3A",
    "mV9CiMuh2SDOMUlMCAOFvcquEVPfId0JBZLSAN/gLGc0T4BTdCUfRVT+PPzb3NVP",
    "0d1MWBe4v53x942cBhXBdDP4LrtrIUqyfe0cVuzvPXloKhOCIyE5rI1m+ypZmqaF",
    "Td6f9r0BKbMQCwzooxJ2TlH3OMx3ObrKGY17AA5W1wTJ63/h+/7ahoEw6uGhlce8",
    "DWEZx1B/vpReHRLNPvPWRIjNPQ5Aklco5RhohOOgWgkaupHS7bslOhmqiREUSQyn",
    "dX5Cfe4Ko+tPz0mijJNqpwVLz/uCt7E+Vt3hwc2zrVFAa2EOxz7GBROvhwV8KFxn",
    "jrppyU20gb1yOp+J",
  ].join("");

  // Read Leaf Certificate
  const leafCert = pkijs.Certificate.fromBER(Buffer.from(pemLeafCert, "base64"));
  const caCert = pkijs.Certificate.fromBER(Buffer.from(pemCACert, "base64"));

  // Create OCSP request
  const ocspReq = new pkijs.OCSPRequest();

  ocspReq.tbsRequest.requestorName = new pkijs.GeneralName({
    type: 4,
    value: leafCert.subject,
  });

  await ocspReq.createForCertificate(leafCert, {
    hashAlgorithm: "SHA-256",
    issuerCertificate: caCert,
  });

  const nonce = crypto.getRandomValues(new Uint8Array(10));
  ocspReq.tbsRequest.requestExtensions = [
    new pkijs.Extension({
      extnID: "1.3.6.1.5.5.7.48.1.2", // nonce
      extnValue: new asn1js.OctetString({ valueHex: nonce }).toBER(),
    })
  ];

  // Output the OCSP request as a set of bytes in ASN.1 encoding
  const raw = ocspReq.toSchema(true).toBER();
  console.log(raw); // ArrayBuffer <30 81 98 30 81 95 a1 18 a4 16 30 14 31 12 30 10 06 03 55 ... 55 more bytes>
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
