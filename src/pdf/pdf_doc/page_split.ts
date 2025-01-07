import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const raw = fs.readFileSync(path.resolve(__dirname, "files", "page_remove.pdf"));

  // Read the PDF document
  const doc = await pdfDoc.PDFDocument.load(raw);

  const doc1 = await doc.clone({
    pages: [
      [, 3], // pages: begin ... 3
    ]
  });
  const doc2 = await doc.clone({
    pages: [
      [3], // pages: 3 ... end
    ]
  });
  const doc3 = await doc.clone({
    pages: [ // pages: 1, 3 ... 7
      1,
      [3, 7]
    ]
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
