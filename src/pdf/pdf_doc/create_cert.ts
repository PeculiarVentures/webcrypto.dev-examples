import * as fs from "node:fs";
import * as pdfCore from "@peculiarventures/pdf-core";
import * as pdfFont from "@peculiarventures/pdf-font";
import * as pdfDoc from "@peculiarventures/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";
import * as pkijs from "pkijs";

// Text style
const paddingTop = 20;
const paddingLeft = 20;
const sizeHeader1 = 18;
const sizeNormal = 10;
const lineLeading = 10;

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pdfCore.PDFCryptoEngine({ crypto }));

  const pem = [
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

  // Create an empty PDF document and protect it using X509 certificate
  const doc = await pdfDoc.PDFDocument.create({
    algorithm: "AES256",
    recipients: [
      new x509.X509Certificate(pem),
    ],
  });

  // Register default founts
  const helvetica = doc.addFont(pdfFont.DefaultFonts.Helvetica);
  const helveticaBold = doc.addFont(pdfFont.DefaultFonts.HelveticaBold);

  // Add a page (A4 by default)
  const page1 = doc.pages.create();

  // Write Page 1
  let textTopPosition = paddingTop;
  page1.text()
    .color(0) // black
    .font(helveticaBold, sizeHeader1)
    .move(paddingLeft, textTopPosition)
    .show("Page 1")
    .nextLine();

  // Write text
  textTopPosition += sizeHeader1 + lineLeading;
  page1.text()
    .color(0) // black
    .font(helvetica, sizeNormal)
    .move(paddingLeft, textTopPosition)
    .show("This document is protected using Public Key Encryption handler.");

  // Save the document
  const raw = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
