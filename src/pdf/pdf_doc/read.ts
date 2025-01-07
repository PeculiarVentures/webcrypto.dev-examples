import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  // Read the PDF document
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "read.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw);

  console.log("Pages:", doc.pages.length); // Pages: 1

  const page1 = doc.pages.get(0);
  console.log(page1); // PDFPage
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
