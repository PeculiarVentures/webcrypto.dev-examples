import * as fs from "node:fs";
import * as pdfCore from "@peculiarventures/pdf-core";
import * as pdfFont from "@peculiarventures/pdf-font";
import * as pdfDoc from "@peculiarventures/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
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

  // Create an empty PDF document and protect it using password
  const doc = await pdfDoc.PDFDocument.create({
    algorithm: "AES256",
    userPassword: "12345",
    permission: pdfCore.UserAccessPermissionFlags.printDocument,
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
    .show("This document is password-protected. You cannot copy the text, but you can print the document.");

  // Save the document
  const raw = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
