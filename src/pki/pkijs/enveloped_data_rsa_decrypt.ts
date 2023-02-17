import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const pemCms = [
    "MIAGCSqGSIb3DQEHA6CAMIACAQIxggFvMIIBawIBADAkMB8xHTAbBgNVBAMTFElu",
    "dGVybWVkaWF0ZSBDQSAjMi4xAgEBMDwGCSqGSIb3DQEBBzAvoA8wDQYJYIZIAWUD",
    "BAIBBQChHDAaBgkqhkiG9w0BAQgwDQYJYIZIAWUDBAIBBQAEggEAc3KxjpZOA4Be",
    "49ewsWSrtNmWUeOfjkr4p4jYayZLhULEDIOiUlIomGXdSA42NkBEBfDqsN1qrLhc",
    "4RSHQFQJns44b+sUTpcWEV7XwSRwlti3zG5gyr1aAVM49rq2BhEqIWVe9xBmX20j",
    "Yu/zx6vdtplsCZebz1WX+6IrFjdHEU18f97GrTxaKZf2X3iwWcYREdOY+ZKkXUTn",
    "Q67PyrfXJKJ6T988Qz8HbunCyCkEgK4+fF2afdMLFyETXsNOdabSiDDU5qpPNJYc",
    "55AmAJLLn56mpasZNjZzVlW88WZygslJR5M+KLZSFQJUIpd7UQsk8Tn5O/dTQ+Os",
    "X0l1SMrc6DCABgkqhkiG9w0BBwEwHQYJYIZIAWUDBAEuBBAYkg/AVj8R1zeLSEJJ",
    "71+PoIAEGc69vw84/JWAjykM7zrOBhIP/vp5yjRiNf8AAAAAAAAAAAAA",
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

  // Import the RSA-OAEP key
  const key = await crypto.subtle.importKey("pkcs8", Buffer.from(pemPkcs8, "base64"), { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"]);

  // Read the CMS
  const contentInfo = pkijs.ContentInfo.fromBER(Buffer.from(pemCms, "base64"));
  if (contentInfo.contentType !== pkijs.ContentInfo.ENVELOPED_DATA) {
    throw new Error("CMS is not Enveloped Data.");
  }
  const cmsEnveloped = new pkijs.EnvelopedData({ schema: contentInfo.content });

  // Decrypt the message
  const decryptedData = await cmsEnveloped.decrypt(0, {
    recipientPrivateKey: key,
  });

  // Output the message
  console.log("Message:", Buffer.from(decryptedData).toString());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
