import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfCore from "@peculiar/pdf-core";
import * as pdfDoc from "@peculiar/pdf-doc";
import * as pdfFormJson from "@peculiar/pdf-form-json";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pdfCore.PDFCryptoEngine({ crypto }));

  // Read the PDF document
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "form.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw);

  const json = pdfFormJson.globalFormConverter.export(doc);

  // List all form elements
  for (const name in json.form) {
    const item = json.form[name] as Record<string, any>;

    console.log("Component:");
    console.log("  Name:", name);
    console.log("  Type:", item.type);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
