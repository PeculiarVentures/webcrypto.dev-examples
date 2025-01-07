import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const raw1 = fs.readFileSync(path.resolve(__dirname, "files", "page_remove.pdf"));
  const raw2 = fs.readFileSync(path.resolve(__dirname, "files", "page_remove.pdf"));

  // Read the PDF documents
  const doc1 = await pdfDoc.PDFDocument.load(raw1);
  const doc2 = await pdfDoc.PDFDocument.load(raw2);

  await doc1.pages.append(doc2, {
    pages: [[3]], // pages: 3 ... end
  });

  // Save the document
  const raw3 = await doc1.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw3), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
