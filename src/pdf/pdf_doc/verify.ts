import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfDoc from "@peculiarventures/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";
import * as pkijs from "pkijs";

async function main() {
  const crypto = new Crypto();

  // Set crypto engine for PKIjs module
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  // Set crypto engine for X509 module
  x509.cryptoProvider.set(crypto);

  // Read the PDF document
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "verify.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw);

  const sigStatus = await doc.verify({
    checkDate: new Date("2023-02-22"),
  });

  console.log(sigStatus);
  // {
  //   err: null,
  //   items: [
  //     {
  //       verificationResult: false,
  //       signedData: [CMSSignedData],
  //       hasSHA1: false,
  //       name: 'signature 1',
  //       reason: 'Test signing',
  //       location: null,
  //       signingTime: 2023-02-21T16:27:51.000Z,
  //       checkDate: 2023-02-22T00:00:00.000Z,
  //       signatureType: 'signature',
  //       signerCertificate: [X509Certificate],
  //       states: [
  //         {
  //           type: 'warn',
  //           code: 'formatting',
  //           text: "Document structure doesn't match PDF specification.",
  //           data: {}
  //         },
  //         {
  //           type: 'valid',
  //           text: 'The document has not been modified since it was signed',
  //           code: 'document_modification',
  //           data: [Object]
  //         },
  //         {
  //           type: 'info',
  //           text: "Signing time is from the clock on the signer's computer",
  //           code: 'signing_time',
  //           data: [Object]
  //         },
  //         {
  //           type: 'info',
  //           text: 'Signature is not LTV enabled',
  //           code: 'ltv',
  //           data: [Object]
  //         },
  //         {
  //           type: 'valid',
  //           text: "The signer's identity has been verified",
  //           code: 'identity_verification',
  //           data: [Object]
  //         }
  //       ]
  //     }
  //   ]
  // }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
