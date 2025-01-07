import * as fs from "node:fs";
import * as path from "node:path";
import * as pdfCore from "@peculiar/pdf-core";
import * as pdfDoc from "@peculiar/pdf-doc";
import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";
import * as pkijs from "pkijs";

async function main() {
  const crypto = new Crypto();

  // Set crypto engine for PKIjs module
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  // Set crypto engine for X509 module
  x509.cryptoProvider.set(crypto);

  // Import certificate
  const certPem = [
    "MIIDIDCCAgigAwIBAgIBATANBgkqhkiG9w0BAQsFADA3MRkwFwYDVQQDExBUZXN0",
    "IGNlcnRpZmljYXRlMQ0wCwYDVQQKEwRUZXN0MQswCQYDVQQHEwJVUzAeFw0yMzAy",
    "MTMwMDAwMDBaFw0zMzAyMTMwMDAwMDBaMDcxGTAXBgNVBAMTEFRlc3QgY2VydGlm",
    "aWNhdGUxDTALBgNVBAoTBFRlc3QxCzAJBgNVBAcTAlVTMIIBIjANBgkqhkiG9w0B",
    "AQEFAAOCAQ8AMIIBCgKCAQEAmb5m2i16z5GAlWxgAE6Unt6SkCwVX67oMXFMqFPH",
    "RmktTvitt9glY3/UZPm8RALVSxWUtk/msD2XEW/fztm/UjtfbDLBLe+FX2yojkJ6",
    "++p0GZ34u5e1zEdl/NIxt7EyovysLxDygJmFLnxjVxI4NwoU30x/5dshyqbZDr5y",
    "DI1OCF8w++MhHpqDxAEg1+GSZfAnuDHqcAIGIAzPzZ3P+mgeLrcF6VZuRTd7PkLP",
    "45iSPmgjubfU7MeUOU//5Zhy27fbDZN/Uvh+Ck6LT9U8kTUUvY/Vl6dhcYityhOa",
    "1QDsjDWmnx70X4eDvOKXqoUlrnRfyn3IBwsls2yC2Xz5/QIDAQABozcwNTAOBgNV",
    "HQ8BAf8EBAMCBsAwDwYDVR0TAQH/BAUwAwIBADASBgNVHSAECzAJMAcGBSoDBAUG",
    "MA0GCSqGSIb3DQEBCwUAA4IBAQCMsEtT/0Bwe0VGH6LqiWBVnspAxye7/59vcNP4",
    "eyKNM9Ah3+NoylEerSfy3XWiNGJjraBpt9BgXuTMCjznoUfjDGCcDtqGoJPciDu2",
    "8XnlZBVhG/442BBef5kPkaqYDjN19z5yabWnGgB/jtr01/tbqGtKSEtUS8NVdE82",
    "Mfh8bBwE6/4usy4wN1J3sW0x7bA9QqN00Jvga97XVc5sfasbL9qhSDtwq6sxKNID",
    "9Sdmv0zaX1WIGAcUyFzKgUqXK1WB6ZAmGiAu7kixBgm2+RRBrgeG6JP7o2ADGBnZ",
    "+4mAzW8+/sXWm7QfmVcD4ouoL3r0s8Nep6sxQQ8upLIgX0oi",
  ].join("");
  const cert = new x509.X509Certificate(certPem);

  // Import key
  const algorithm = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
  };
  const keyPem = [
    "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZvmbaLXrPkYCV",
    "bGAATpSe3pKQLBVfrugxcUyoU8dGaS1O+K232CVjf9Rk+bxEAtVLFZS2T+awPZcR",
    "b9/O2b9SO19sMsEt74VfbKiOQnr76nQZnfi7l7XMR2X80jG3sTKi/KwvEPKAmYUu",
    "fGNXEjg3ChTfTH/l2yHKptkOvnIMjU4IXzD74yEemoPEASDX4ZJl8Ce4MepwAgYg",
    "DM/Nnc/6aB4utwXpVm5FN3s+Qs/jmJI+aCO5t9Tsx5Q5T//lmHLbt9sNk39S+H4K",
    "TotP1TyRNRS9j9WXp2FxiK3KE5rVAOyMNaafHvRfh4O84peqhSWudF/KfcgHCyWz",
    "bILZfPn9AgMBAAECggEAB98nTflxJcqJ3lyvp6ReWKoFsAsJxx3h9pIZ/i5X8CN3",
    "dekmn9iZxXfojIj62jKY8CC5PgJmSdTFdNeZCnK8qH2wu433tR3j4shh8vK1cEuH",
    "ST5820H/xWdMcf7jG8gfUxgDyt8fw3TYzFIDFhSxOyQxgGNe0wp+tu0HBQm8Nic7",
    "pLjVviBZSUdOmEX9Uk9VzuiM5fG1OV+tGI3oRPmt+K/UnezaD+G18FmViHmqTY+Y",
    "/xBuUbmz6EAFiznoCdM6fnIP8ym6wENyXWP2kUQouH9q6h0Kno9mK9kRUsP6iX1B",
    "LY5Jnqz3w25m3cAbph1uIbwoPii72Z084N5FlFB8owKBgQC78uB720JSYjBEnyUN",
    "y9sOG4q8TkaWl5R53SuWtqSP+vMjdq4qeaXjuYwCAXZRthfVA7LXJqvXUr2sqCd2",
    "2JxQHbQD/kmjZ9rf0/u32MEKbN9ka10dVIJcwOlVuo0V+22i+a//0rofzujrKMhA",
    "mOV9jE9HYZyWVlfCSEMLY8bMCwKBgQDRaQl8jzUWyOG7CYCXnuo9xxG0AbIE1pD8",
    "90/I1YS3jwRFnmcUXvXxa+4pi5gPAIk0CvRdJ/fqYSr+PsQdMYI73g26W0Mm4GGp",
    "SXxyZ0TfH6HV5JGl8b0qlqoqG2dx2wCtpQaSny8MdP0tG9RZaro51vl+7EHk85CF",
    "7tTmdYQPFwKBgAZl6zxsJ2LUkt4TKNjCYs+lImDsrTx9JoHLhKtZxlpcaaCAbsdl",
    "Yr9Q1rJOyG9ZqpAG0zS9zUXEPE6/XrCOCSw1BqbIJkuYwnuyJLSKfW/UavppKT9R",
    "XCq6KndPpXPlHkNZCqPD0bA5g/ZVahPA4LcYaq58ZS88+znS6e1eVSsnAoGBAKJt",
    "N2d+6K3ImJXrs+tm3seWLdwSaJMqHoGoDiF3xB5gdu7NA6UgVuGwVqWw2fvg7YsJ",
    "aCsNglUwkxlrc9A1A5AOF1XRzc9MwVN+ZWGTSi9KqMtwI6y0SYbMICbS5LTCKs+F",
    "LgjyIZsm7u1bJaVJjDKq1RCmjiHY7eOEsWwkAI93AoGARSnZWXQ7IBufCvVBoqZ8",
    "pVL7ZQSQih9l4liUfnB1NS9VWVo2mnqJjNFqHvW1bKUfP+0YZl98M1/VqTP3zIsU",
    "furDm5aOiYozMMMFEo41mUDYC65tLcmtXiwAU04LM077Rv0WXWWoa1AYeR04AeVF",
    "AZVTh7B0NZ9yCMmQsdTA5Ww=",
  ].join("");
  const key = await crypto.subtle.importKey("pkcs8", Buffer.from(keyPem, "base64"), algorithm, false, ["sign"]);

  // Read the PDF document
  const raw = fs.readFileSync(path.resolve(__dirname, "files", "page_remove.pdf"));
  const doc = await pdfDoc.PDFDocument.load(raw);

  const page1 = doc.pages.get(0);
  const sig1 = page1.addSignatureBox({
    groupName: "signature 1",
  });

  // Sign document
  await sig1.sign({
    dictionaryUpdate: async (sig: pdfCore.SignatureDictionary) => {
      sig.subFilter = "adbe.pkcs7.detached";
      sig.Reason.set(new pdfCore.PDFLiteralString("Test signing"));
      sig.signingTime = new pdfCore.PDFDate(new Date());
      sig.name = new pdfCore.PDFLiteralString(cert.subjectName.getField("CN").join(" ")); // Use CN
    },
    containerCreate: async (data: Uint8Array) => {
      //Create CMS
      const messageDigest = await crypto.subtle.digest("SHA-256", data);
      const signedData = new pdfDoc.CMSSignedData();
      const signer = signedData.createSigner(cert, {
        digestAlgorithm: "SHA-256",
        signedAttributes: [
          new pdfDoc.ContentTypeAttribute(pdfDoc.CMSContentType.data),
          new pdfDoc.MessageDigestAttribute(messageDigest),
        ],
      });
      signedData.certificates.push(cert);
      await signedData.sign(key, signer);

      return signedData.toBER();
    }
  });

  // Save the document
  const raw2 = await doc.save();
  fs.writeFileSync("doc.pdf", Buffer.from(raw2), { flag: "w+" });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
