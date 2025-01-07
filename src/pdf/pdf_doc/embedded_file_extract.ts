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
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "embedded_file.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw);

  // Output a list of embedded files
  for (const [id, file] of doc.embeddedFiles) {
    console.log("File:");
    console.log(" ID:", id);
    console.log(" Name:", file.name);
    console.log(" Description:", file.description);
    console.log(" Created:", file.created);
    console.log(" Updated:", file.updated);
    console.log(" Size:", file.size);
  }

  // Get an embedded file by id and output file content
  const image = doc.embeddedFiles.get("image.png");
  console.log(image.data); // ArrayBuffer

  // Save the document
  const raw2 = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw2), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
