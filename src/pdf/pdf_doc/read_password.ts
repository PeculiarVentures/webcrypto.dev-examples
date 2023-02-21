import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfCore from "@peculiarventures/pdf-core";
import * as pdfDoc from "@peculiarventures/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pdfCore.PDFCryptoEngine({ crypto }));

  // Read the PDF document
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "password_12345.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw, {
    onUserPassword: async (reason) => {
      if (reason) {
        throw new Error("Incorrect password.");
      }

      return "12345"; // Password
    }
  });

  console.log("Pages:", doc.pages.length); // Pages: 1

  const page1 = doc.pages.get(0);
  console.log(page1); // PDFPage
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
