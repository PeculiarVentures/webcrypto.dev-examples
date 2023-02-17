import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const pemRecipient = [
    "MIICzzCCAbegAwIBAgIBATANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDExRJbnRl",
    "cm1lZGlhdGUgQ0EgIzIuMTAeFw0xOTEyMzEyMzAwMDBaFw0yMDAxMDEyMzAwMDBa",
    "MBQxEjAQBgNVBAMTCUNsaWVudCAjMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC",
    "AQoCggEBAJ7B5Lz1S7D5nrbiWgp/WKTRK8sUF5E888uK6KBzkUhnXQz6vvw07npz",
    "SlPsqLl+yGebo91YEzkKl2VoPCC06I6fCTw8SvOcam8O4dnvJPKcD58Ovh62tdhV",
    "fd+SoWkZYq7v1qgsHEFNVsJaC/NdPSvxFEWN3rp/jBz7XbgUXfcCUdF0AMF3zcK1",
    "B43OBfFVbat5kRmQ1neobYXC1oUQ0gSxK+aXcK1d/6JAH5dnhL7LkG0l1zKIjON9",
    "zx4ncEX34xe3hgjTgHod3wZMoZStINaRIKb/0pKgM0muc0ztO1Tobh9ptKUBVwU9",
    "0dfkljUQJPzZ6ebxsGuxmiGq1CSe2xsCAwEAAaMhMB8wHQYDVR0OBBYEFFdl/SxI",
    "8thcBo63c/dTwMAuzLd2MA0GCSqGSIb3DQEBCwUAA4IBAQCkmk+zSz+VRBXXBECr",
    "dHEnfyGtCfkA/ThKTlvLyXD2J8/kiIoJiwALFVXD4cp+4CCpbSrFHlfbN6vM1PQ1",
    "ZFDWDehQif29Z6c/J6eYggR/1kyg69cvfKfRotODfT7hbuN4X8CrWAqn15Y2+lqR",
    "6T7ExYIO2JtSEEJUN57Dy09XwkZocCo6oXRhFOAvk9Tb+iHL4YF+6hfmzr4q6kC0",
    "naR6D/TazYXjfPIwlq2rP7Q1DYJkGv5KmyMj04JfgShU7lRFzhuYr9XFlMyTe96/",
    "V8Nwg6pmmASeuvV4MsAFo20CTXwDgO/BgFgNnYYuu9RxPmS4oBT22uRXJrbp4yp6",
    "sEQc",
  ].join("");

  // Parse the recipient certificate
  const recipient = pkijs.Certificate.fromBER(Buffer.from(pemRecipient, "base64"));
  const data = Buffer.from("Test data");

  // Create an Enveloped Data
  const cmsEnveloped = new pkijs.EnvelopedData();

  // Add recipient
  cmsEnveloped.addRecipientByCertificate(recipient, { oaepHashAlgorithm: "SHA-256" });

  // Secret key algorithm
  const alg = {
    name: "AES-GCM",
    length: 256,
  };

  // Encrypt the message
  await cmsEnveloped.encrypt(alg, data);

  // Add Enveloped Data into CMS Content Info
  const cmsContent = new pkijs.ContentInfo();
  cmsContent.contentType = pkijs.ContentInfo.ENVELOPED_DATA;
  cmsContent.content = cmsEnveloped.toSchema();

  // Encode CMS to ASN.1
  const cmsContentRaw = cmsContent.toSchema().toBER();
  console.log(cmsContentRaw); // ArrayBuffer <30 80 06 09 2a 86 48 86 f7 0d 01 07 03 a0 80 30 80 02 01 02 ... 374 more bytes>>
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
