import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfCore from "@peculiar/pdf-core";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pdfCore.PDFCryptoEngine({ crypto }));

  const pemCert = [
    "MIIDYjCCAkqgAwIBAgIKfLPvDVZqwJmrrDANBgkqhkiG9w0BAQsFADBfMRcwFQYD",
    "VQQDEw5BY3JvYmF0IFJTQSBJRDEJMAcGA1UEChMAMQkwBwYDVQQLEwAxITAfBgkq",
    "hkiG9w0BCQEWEm1pY3Jvc2hpbmVAbWFpbC5ydTELMAkGA1UEBhMCVVMwHhcNMjMw",
    "MTI2MTIwMzA2WhcNMjgwMTI2MTIwMzA2WjBfMRcwFQYDVQQDEw5BY3JvYmF0IFJT",
    "QSBJRDEJMAcGA1UEChMAMQkwBwYDVQQLEwAxITAfBgkqhkiG9w0BCQEWEm1pY3Jv",
    "c2hpbmVAbWFpbC5ydTELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IB",
    "DwAwggEKAoIBAQC7WqzEg2jPbImxVV/tSJQbalHfywf4rzUOjVLY5w4Fs5CHEOPv",
    "j25vBymLywwP6Qrd6Tor14pon9hEiVG3pV2HBBduCfHVi2Sbe00/t6ENYbDrlHyx",
    "aHUttAcdH94hFawnhAy2ad4ZdsyShub5Vdd3jTE0/5gPar5RuMpH4JKCxzaj47nW",
    "KNRunLuBadybP4JEj2DZvrS9Ci8erlP3f7+fXM8Vt7rmlkFoKF74JDaw+hBDDzg2",
    "DX4abK0XCTFF0HhBlnjnCU+0mhOpa5hkbH3qhbYfbNoAtuDw5g0y3JcYZLzSnika",
    "qC4j8Qq1Q1FQa7zbZeHh77GNG2wTVsvNouJZAgMBAAGjIDAeMA8GCSqGSIb3LwEB",
    "CgQCBQAwCwYDVR0PBAQDAgOYMA0GCSqGSIb3DQEBCwUAA4IBAQBsaEfb1dYL870/",
    "lfC2/4RMdcUVanytiUz3cQorDuKf/o538KtjpWsPv57pfeNM6rpiwwD5eOARvbHZ",
    "CsNApxbAIZ1z2WOq6ws9i1e+o7bbgqkGAx8FJVxaZCbrW3OCmX6jxMynUislR+s8",
    "kxK7X81WNYa3IbaE7ZgKA3407hOD3Ensns738GkaLfpTQ95xckO/cE0bBkL/WWZH",
    "woH0iYwEHdMSLeC21EGrnBNH1HO8iD+h+bBnNbzHpjaZqKKeK269GXJFr7C7tjQE",
    "+lCDB6+G3rygnUxSBghWfYVJQsmL6EIt2CHuOFnA6Li+b4CGDFuEJf5FQt2w70k2",
    "OL+gyIP3",
  ].join("");

  const pemKey = [
    "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7WqzEg2jPbImx",
    "VV/tSJQbalHfywf4rzUOjVLY5w4Fs5CHEOPvj25vBymLywwP6Qrd6Tor14pon9hE",
    "iVG3pV2HBBduCfHVi2Sbe00/t6ENYbDrlHyxaHUttAcdH94hFawnhAy2ad4ZdsyS",
    "hub5Vdd3jTE0/5gPar5RuMpH4JKCxzaj47nWKNRunLuBadybP4JEj2DZvrS9Ci8e",
    "rlP3f7+fXM8Vt7rmlkFoKF74JDaw+hBDDzg2DX4abK0XCTFF0HhBlnjnCU+0mhOp",
    "a5hkbH3qhbYfbNoAtuDw5g0y3JcYZLzSnikaqC4j8Qq1Q1FQa7zbZeHh77GNG2wT",
    "VsvNouJZAgMBAAECggEAM29JTwnklE1v38dYdoQeZQhjQdUzcwpmvn/95p5IMziA",
    "zRPN/86YutJ0jXRI83U/Dn0hAzhBP0fiz64DSS+U5aQx6nvAcKe8DxNiucNn64yO",
    "TZ6OPQY4ZTuvWEePa/XPNWoDM3ENEGCU+QUgFAOFC8UvZSVmUZU0eqsInYMBtfUR",
    "0MHq5hMDP2HaFRTWDh8fvSrasdA0WC6CqBMsUGJnHIW31p0cTnD+zf8cJ1qyzfi8",
    "SNVFPTIQjbdkkH8cSGH75JYGPZ5nuNhlNFdSdoJIFpc9I2ZqR2KNcqB0R+pE9Vvg",
    "2U0U9mxZ8QCh2sVscsEf09MZYQycJuLFz7yt8PiGoQKBgQDBLegF8oIlbPGOVtul",
    "YKIETOx7E7NW+rfR3n7vOnzQUgsa7+rLF/4CCprjUxr7xLrEX/ItwN+q5HNorqWL",
    "81SqHooiXA86/s1agKJMFhKaKA983vqdb/515yftptkkeuz32Y25WE02tjK/KYfQ",
    "V3zofXMeM4CZNVtETIlFs0YSNwKBgQD4R9RhP/7hvWm0S7HpyJlst9sEU7gvFX1Z",
    "2yLsfCXF/2RPO+048rd5xhOn8h07tclztGvziwtA1Ka1jgOe11iSSJWTKVwf/WVl",
    "Fir61feP2w7todUvu+gLHvHRHSpOw7PIUGZm1Km7BgJS5XCAg7loRgCw9FprC9em",
    "qNSdPlqn7wKBgEywTbj2seXrnuVz49R+TTNJ2mNtybdQ5uKA4oFUBbKpr1DtR5eC",
    "mcrzrNNr7X1fdwl4UWsKc4CjGpHHK18opUa3wvyq8TzpZFp2UHfGF3JtTuCyoGkZ",
    "ybnCn14/61oJFsO58QJQZK7Am9q5wPnbkXG2Q5oMthOcU/QEMkaiScH3AoGBAL4h",
    "49aFt58P+r8DqL+ryzKiqarqogYMou4JDvmjKRoztpGnBsexuCgdNDhNBW4QjLF6",
    "3aCoPnnrX69xjfw6Va3QwBrudYpZ9ygujcOB0A/uZcQ9RpFDiTPbArxtZVTkMe2Z",
    "BJKDEWgT9fudkUYZmgbsdOMOfZ+0dfU/HXM9qRcpAoGASIYb2YG7Wk0Wb/RrnpZ5",
    "aPEOVfSigHSjlsR7PrhQon7mda2vnL2s4Qit7q6YMSOgBFUSYVEhTZIMKXWXbJx/",
    "nlvSxsRrPdVilooDnAsvMHOBuK/eeyIO0KHqklg22DXa2NdVTCKzfsiA2IJFLHhF",
    "1KxCznCQiAmdGOj3B4jBwXE=",
  ].join("");

  // Read the PDF document
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "cert.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw, {
    onCertificate: async () => {
      return {
        certificate: new x509.X509Certificate(pemCert),
        key: await crypto.subtle.importKey("pkcs8", Buffer.from(pemKey, "base64"), "RSAES-PKCS1-v1_5", false, ["encrypt", "decrypt"]),
        crypto,
      };
    }
  });

  console.log("Pages:", doc.pages.length); // Pages: 1

  const page1 = doc.pages.get(0);
  console.log(page1); // PDFPage
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
