import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfCore from "@peculiar/pdf-core";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pdfCore.PDFCryptoEngine({ crypto }));

  // Read the PDF document
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "page_remove.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw);

  // Clone document with default password and set User permissions
  const doc2 = await doc.clone({
    algorithm: "AES256",
    // Permissions: printDocument | modifyContent | copy | annots | fillForms | assembleDocument | printRepresentation
    permission: 0
      | pdfCore.UserAccessPermissionFlags.copy // Copy or otherwise extract text and graphics from the document
      | pdfCore.UserAccessPermissionFlags.fillForms // Fill in existing interactive form fields
  });

  // Save the document
  const raw2 = await doc2.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw2), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
