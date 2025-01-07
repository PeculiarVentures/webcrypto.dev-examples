import * as fs from "node:fs";
import * as pdfFont from "@peculiar/pdf-font";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

// Text style
const paddingTop = 10;
const paddingLeft = 10;
const sizeHeader1 = 18;
const sizeHeader2 = 14;
const sizeNormal = 10;
const lineLeading = 10;

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  // Create an empty PDF document
  const doc = await pdfDoc.PDFDocument.create();

  // Register default founts
  const helvetica = doc.addFont(pdfFont.DefaultFonts.Helvetica);
  const helveticaBold = doc.addFont(pdfFont.DefaultFonts.HelveticaBold);

  // Add a page (A4 by default)
  const page1 = doc.pages.create();

  // Write Header 1
  let textTopPosition = paddingTop;
  page1.text()
    .color(0) // black
    .font(helveticaBold, sizeHeader1)
    .move(paddingLeft, textTopPosition)
    .show("Header 1")
    .nextLine();

  // Write Header 2
  textTopPosition += sizeHeader1 + lineLeading;
  page1.text()
    .color(0) // black
    .font(helveticaBold, sizeHeader2)
    .move(paddingLeft, textTopPosition)
    .show("Header 2");

  // Write text
  textTopPosition += sizeHeader2 + lineLeading;
  page1.text()
    .color(0) // black
    .font(helvetica, sizeNormal)
    .move(paddingLeft, textTopPosition)
    .show("Some text");

  // Save the document
  const raw = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
