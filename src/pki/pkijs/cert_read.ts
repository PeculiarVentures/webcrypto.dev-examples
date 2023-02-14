import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  // BASE64 representation of the Certificate
  const base64 = [
    "MIIDIDCCAgigAwIBAgIBATANBgkqhkiG9w0BAQsFADA3MRkwFwYDVQQDExBUZXN0",
    "IGNlcnRpZmljYXRlMQ0wCwYDVQQKEwRUZXN0MQswCQYDVQQHEwJVUzAeFw0yMzAy",
    "MTMwMDAwMDBaFw0yNDAyMTMwMDAwMDBaMDcxGTAXBgNVBAMTEFRlc3QgY2VydGlm",
    "aWNhdGUxDTALBgNVBAoTBFRlc3QxCzAJBgNVBAcTAlVTMIIBIjANBgkqhkiG9w0B",
    "AQEFAAOCAQ8AMIIBCgKCAQEAhe8ncyqNwGTNUGeTEMxcrJiwBVBCHTj10E7jqm10",
    "g5Wo/E7DPMjk6Gyli1XL4ALWqDZrn0Iz1oq8bk5ULYsEB3FlWy+NXIY2ilF+Bz+T",
    "p12uQmDXlQaU4c6Nm9uNXnCn0FM9cj+9pcQDlxmJkx/3BiHo8+U+aCHuSWBFDjN+",
    "+1B95UQSrNVHmzg+WyjccvptsAPvATY7bjPZCyo3zXZgl41rLghEzaQ7pstbl2Vb",
    "Scy1R2hdmrtKyd42bF3RCqQ9DuO/YgOMd2mgdEbDDH80khn9HXxRx9nOMWf2bR44",
    "tDfqHYda9UcSq8JNOb9msKPskwI9CX3vJq4doUQn4/3ZuwIDAQABozcwNTAOBgNV",
    "HQ8BAf8EBAMCBsAwDwYDVR0TAQH/BAUwAwIBADASBgNVHSAECzAJMAcGBSoDBAUG",
    "MA0GCSqGSIb3DQEBCwUAA4IBAQAXkqSAUNu+lRnUHAVcw4QMQ9GwUfZIFD403BVC",
    "WCi75/RFNYY+RF3PD0ypFJ61bHvcpJ8j/CDk7hokLWQhEZ2kd6FKtAqGOX+fEnLD",
    "SJdw1pLVZx7bBwnDxlvaCnn2wlcqTI5kwyONGWHU681Wfz72zJHMsGYW7GmQCOmb",
    "M7UHrVkGxQueYi4MqxfAumR0oh+FMvTqc74IrOn68EguWGanLMqQZsgZeQKAfukJ",
    "8pXY3a08hHKgvk+7NCogqBtiFUYVJ8R6EZ7VDDI4FtV7IwtlzhKiuShWp+wmuae5",
    "dTlg6DIG2NY1ecIoxnpPDwZcfvQY9NGrjhKvK96IFhx2FGn0",
  ].join("");

  // Create new Certificate instance from the BASE64 encoded data
  const raw = Buffer.from(base64, "base64");
  const cert = pkijs.Certificate.fromBER(raw);

  // Output the certificate information
  console.log("Certificate:");
  console.log("  Serial number:", cert.serialNumber.valueBlock.toString()); // Serial number: 1
  console.log("  Issuer:", cert.issuer.typesAndValues.map(o => `${o.type}=${o.value.valueBlock.value}`).join(", ")); // Issuer: 2.5.4.3=Test certificate, 2.5.4.10=Test, 2.5.4.7=US
  console.log("  Subject:", cert.subject.typesAndValues.map(o => `${o.type}=${o.value.valueBlock.value}`).join(", ")); // Subject: 2.5.4.3=Test certificate, 2.5.4.10=Test, 2.5.4.7=US
  console.log("  Public key:", cert.subjectPublicKeyInfo.algorithm.algorithmId); // Public key: 1.2.840.113549.1.1.1
  console.log("  Not after:", cert.notAfter.value.toDateString()); // Not after: Tue Feb 13 2024
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
