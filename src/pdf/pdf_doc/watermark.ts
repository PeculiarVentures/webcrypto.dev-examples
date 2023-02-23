import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfCore from "@peculiarventures/pdf-core";
import * as pdfDoc from "@peculiarventures/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const raw = fs.readFileSync(path.resolve(__dirname, "files", "page_remove.pdf"));
  const rawImage = fs.readFileSync(path.resolve(__dirname, "files", "image.png"));

  // Read the PDF document
  const doc = await pdfDoc.PDFDocument.load(raw);

  const image = doc.createImage(rawImage);

  const watermarkAp = doc.createForm("5cm", "5cm");
  watermarkAp.graphics()
    .opacity(.5)
    .drawImage(image, "5cm", "5cm");

  const watermark = doc.createWatermark({
    flags: pdfCore.AnnotationFlags.print,
    appearance: watermarkAp,
    pageHeight: "297mm",
    left: "4cm",
    top: "6cm",
  });

  // Add water mark into all pages
  for (const page of doc.pages) {
    page.addWatermark(watermark);
  }

  // Save the document
  const raw2 = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw2), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
