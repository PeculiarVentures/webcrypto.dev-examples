import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfCore from "@peculiarventures/pdf-core";
import * as pdfDoc from "@peculiarventures/pdf-doc";
import * as pdfFormJson from "@peculiarventures/pdf-form-json";
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pdfCore.PDFCryptoEngine({ crypto }));

  // Read the PDF document
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "form.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw);

  // Update values for specified elements 
  pdfFormJson.globalFormConverter.setValue(doc, [
    {
      name: "Text1",
      type: "text_editor",
      text: "hello world",
    },
    {
      name: "Check Box2",
      type: "check_box",
      checked: true,
    },
    {
      name: "Check Box3",
      type: "check_box",
      checked: false,
    },
    {
      name: "Group4",
      type: "radio_button_group",
      selected: "Choice2",
    },
    {
      name: "Dropdown5",
      type: "combo_box",
      selected: ["option2"],
    }
  ]);

  // Save the document
  const raw2 = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw2), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
