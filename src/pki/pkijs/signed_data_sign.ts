import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const pemLeaf = [
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

  const pemPkcs8 = [
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCeweS89Uuw+Z62",
    "4loKf1ik0SvLFBeRPPPLiuigc5FIZ10M+r78NO56c0pT7Ki5fshnm6PdWBM5Cpdl",
    "aDwgtOiOnwk8PErznGpvDuHZ7yTynA+fDr4etrXYVX3fkqFpGWKu79aoLBxBTVbC",
    "WgvzXT0r8RRFjd66f4wc+124FF33AlHRdADBd83CtQeNzgXxVW2reZEZkNZ3qG2F",
    "wtaFENIEsSvml3CtXf+iQB+XZ4S+y5BtJdcyiIzjfc8eJ3BF9+MXt4YI04B6Hd8G",
    "TKGUrSDWkSCm/9KSoDNJrnNM7TtU6G4fabSlAVcFPdHX5JY1ECT82enm8bBrsZoh",
    "qtQkntsbAgMBAAECggEAR/JeG8Zc1ajipUYigTRiM1t6KdACuDbz05AxyZlmQ3ZY",
    "hKvURs8kLok2K5+KfXo4D0BJPGQQXh7vKq1Y5oemBxCK6mn2m72MvKT1dMM8rthL",
    "+gz/20J5Wb+wylQU42D2SIp38QIAkhWfFnghh1p/gP0B712SjVmFYZMHT4enZ+vE",
    "67DVQtNMuQIqnsCOk/lnFEvVWnIAUJEz+BPv+9LZZ+F7XYVQ47+1BiUmc2GdFWzJ",
    "NKymbty4HAD4SoQeZrjACuQCeeSjLXk9gjvf1CziKF2locfZPM/uI5YLL3Ativwg",
    "J7hvELSm1rCgiR4PlxBxdXobh2TuxsJF/L6MbAviPQKBgQDgXQOl+/jv7mniWEJY",
    "D9wYBTw1WfzXe94BX5VgDnz+slgHhzvf7brWan2jRoqGSaSupufxdY+wrpWKgOYf",
    "mCHlwvc7cckuTgBm056nsydtnuCCKmCnVquzQuu2fBXbfwAAdKrOEfB3hKKE+Pky",
    "Di+JyMqHSaR0eyJb+8SFe0hXJQKBgQC1JKj1XyYDYIBu/wApvJm0RosxxzY6UreQ",
    "HHBA+kh216KQbesm9ltOtqGX3PdqwFBkShf/P0QFfdkgIx1svIxB0K4gjdngCJLk",
    "O8l3kpsNPZQhzcGU5L4iPjmP4hKYEA6g13HvjOR+61LSfraibh3E6uTV6EX/J3XU",
    "qNlslk/1PwKBgQC2yfDb/OH+D54CQueiOSGWDEXWLX85y3e+ZLIc9RDOrFvdnkag",
    "lFzgrRe4uxLGfx8FD4PuC1pKlqHMmmFhoh8TwniL3JML/46CN6yNcf8QZxz/zyi5",
    "jHoMbNv+6y8fiWNl+6bghmsD5HJHpVPYfQgr2ANwnwW1xE/k4sRj/2GbZQKBgBUu",
    "Ly9Zq8kzTHEuEefPbK1+niH46CdTqrEIEjwWx8hVmGWI5LkOj0iZ5DUsmiV6TSwc",
    "2cd3r01xFKVEVdl0BnZfnyyhSXt/pSVYtErt8oFO1PZK57qwMGcynWpshb4QCpXV",
    "+zWGZOVOQMXqGRLPC14OFSnJ2f1msMln4NxoivrjAoGBAJBzZGHRAcD3rpxg7Flc",
    "rV1Rh3zn+QKTWmH1JDjkTGXTfsMB82vQXuQSXboT4sLLAw6x56Y7sSEhuBd7fT1E",
    "5WioiVEVwN5cGb+AcrDUJOmRC5hIMZEKGhtvEz7xMWK1mm0ad6YH1ogBq9AeNUhG",
    "QX5hOIrmLhbgp03ZEl82hy4D",
  ].join("");

  const data = Buffer.from("test message");

  // Import certificate
  const leaf = pkijs.Certificate.fromBER(Buffer.from(pemLeaf, "base64"));

  // Import signing key
  const key = await crypto.subtle.importKey("pkcs8", Buffer.from(pemPkcs8, "base64"), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);

  // Create a new CMS Signed Data
  const cmsSigned = new pkijs.SignedData({
    encapContentInfo: new pkijs.EncapsulatedContentInfo({
      eContentType: pkijs.ContentInfo.DATA, // "data" content type
      eContent: new asn1js.OctetString({ valueHex: data })
    }),
    signerInfos: [
      new pkijs.SignerInfo({
        sid: new pkijs.IssuerAndSerialNumber({
          issuer: leaf.issuer,
          serialNumber: leaf.serialNumber
        })
      })
    ],
    // Signer certificate for chain validation
    certificates: [leaf]
  });

  await cmsSigned.sign(key, 0, "SHA-256");

  // Add Signed Data to Content Info
  const cms = new pkijs.ContentInfo({
    contentType: pkijs.ContentInfo.SIGNED_DATA,
    content: cmsSigned.toSchema(true),
  });

  // Encode CMS to ASN.1
  const cmsRaw = cms.toSchema().toBER();
  console.log(cmsRaw); // ArrayBuffer <30 82 04 a9 06 09 2a 86 48 86 f7 0d 01 07 02 a0 82 04 9a  ... 1097 more bytes>
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
