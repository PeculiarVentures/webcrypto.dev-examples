import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  // Create a PDF document
  const doc = await pdfDoc.PDFDocument.create();

  // Create a new page
  doc.pages.create();

  // Attach file
  const imageRaw = fs.readFileSync(path.resolve(__dirname, "files", "image.png"));
  doc.embeddedFiles.attach({
    id: "image.png",
    name: "image.png",
    data: imageRaw,
    description: "PNG image"
  });

  // Save the document
  const raw2 = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw2), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
