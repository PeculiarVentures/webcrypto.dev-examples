import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const raw = fs.readFileSync(path.resolve(__dirname, "files", "read.pdf"));
  const imageRaw = fs.readFileSync(path.resolve(__dirname, "files", "image.png"));

  // Read the PDF document
  const doc = await pdfDoc.PDFDocument.load(raw);

  // Create a new page
  const page = doc.pages.create();

  // Add image into the document
  const image = doc.createImage(imageRaw);

  // Draw the image
  page
    .graphics()
    .translate("5mm", "5mm")
    .drawImage(image, "2cm", "2cm");

  // Save the document
  const raw2 = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw2), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
