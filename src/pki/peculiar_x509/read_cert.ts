import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";

const crypto = new Crypto();

async function main() {
  // PEM representation of the Certificate
  const pem = [
    "-----BEGIN CERTIFICATE-----",
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
    "-----END CERTIFICATE-----",
  ].join("\n");

  // Create new Certificate instance from the PEM encoded data
  const cert = new x509.X509Certificate(pem);

  // Output the Certificate information
  console.log("Serial number:", cert.serialNumber); // Serial number: 01
  console.log("Issuer:", cert.issuer); // Issuer: CN=Test certificate, O=Test, L=US
  console.log("Subject:", cert.subject); // Subject: CN=Test certificate, O=Test, L=US
  console.log("Public key:", cert.publicKey.algorithm.name); // Public key: RSASSA-PKCS1-v1_5
  console.log("Not after:", cert.notAfter.toDateString()); // Not after: Tue Feb 13 2024
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
