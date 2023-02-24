import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfDoc from "@peculiarventures/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const raw = fs.readFileSync(path.resolve(__dirname, "files", "page_remove.pdf"));

  // Read the PDF document
  const doc = await pdfDoc.PDFDocument.load(raw);

  doc.pages.remove(3);
  doc.pages.remove(1);

  // Save the document
  const raw2 = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw2), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
