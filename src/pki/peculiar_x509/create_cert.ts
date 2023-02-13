import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";

const crypto = new Crypto();

async function main() {
  // Generate a RSA key
  const algorithm = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    publicExponent: new Uint8Array([1, 0, 1]),
    modulusLength: 2048,
  };
  const keys = await crypto.subtle.generateKey(algorithm, false, ["sign", "verify"]);

  // Create a self-signed X509 certificate
  const name = "CN=Test certificate, O=Test, L=US";
  const cert = await x509.X509CertificateGenerator.create({
    serialNumber: "01",
    notBefore: new Date("2023-02-13"),
    notAfter: new Date("2024-02-13"),
    issuer: name,
    subject: name,
    publicKey: keys.publicKey,
    signingKey: keys.privateKey,
    signingAlgorithm: algorithm,
    extensions: [
      new x509.KeyUsagesExtension(x509.KeyUsageFlags.digitalSignature | x509.KeyUsageFlags.nonRepudiation, true),
      new x509.BasicConstraintsExtension(false, 0, true),
      new x509.CertificatePolicyExtension(["1.2.3.4.5.6"]),
      // x509.AuthorityKeyIdentifierExtension,
      // x509.ExtendedKeyUsageExtension,
      // x509.SubjectAlternativeNameExtension,
      // x509.SubjectKeyIdentifierExtension,

    ]
  }, crypto);

  // Output the X509 certificate in PEM format
  console.log(cert.toString("pem"));
  // -----BEGIN CERTIFICATE-----
  // MIIDIDCCAgigAwIBAgIBATANBgkqhkiG9w0BAQsFADA3MRkwFwYDVQQDExBUZXN0
  // IGNlcnRpZmljYXRlMQ0wCwYDVQQKEwRUZXN0MQswCQYDVQQHEwJVUzAeFw0yMzAy
  // MTMwMDAwMDBaFw0yNDAyMTMwMDAwMDBaMDcxGTAXBgNVBAMTEFRlc3QgY2VydGlm
  // aWNhdGUxDTALBgNVBAoTBFRlc3QxCzAJBgNVBAcTAlVTMIIBIjANBgkqhkiG9w0B
  // AQEFAAOCAQ8AMIIBCgKCAQEAhe8ncyqNwGTNUGeTEMxcrJiwBVBCHTj10E7jqm10
  // g5Wo/E7DPMjk6Gyli1XL4ALWqDZrn0Iz1oq8bk5ULYsEB3FlWy+NXIY2ilF+Bz+T
  // p12uQmDXlQaU4c6Nm9uNXnCn0FM9cj+9pcQDlxmJkx/3BiHo8+U+aCHuSWBFDjN+
  // +1B95UQSrNVHmzg+WyjccvptsAPvATY7bjPZCyo3zXZgl41rLghEzaQ7pstbl2Vb
  // Scy1R2hdmrtKyd42bF3RCqQ9DuO/YgOMd2mgdEbDDH80khn9HXxRx9nOMWf2bR44
  // tDfqHYda9UcSq8JNOb9msKPskwI9CX3vJq4doUQn4/3ZuwIDAQABozcwNTAOBgNV
  // HQ8BAf8EBAMCBsAwDwYDVR0TAQH/BAUwAwIBADASBgNVHSAECzAJMAcGBSoDBAUG
  // MA0GCSqGSIb3DQEBCwUAA4IBAQAXkqSAUNu+lRnUHAVcw4QMQ9GwUfZIFD403BVC
  // WCi75/RFNYY+RF3PD0ypFJ61bHvcpJ8j/CDk7hokLWQhEZ2kd6FKtAqGOX+fEnLD
  // SJdw1pLVZx7bBwnDxlvaCnn2wlcqTI5kwyONGWHU681Wfz72zJHMsGYW7GmQCOmb
  // M7UHrVkGxQueYi4MqxfAumR0oh+FMvTqc74IrOn68EguWGanLMqQZsgZeQKAfukJ
  // 8pXY3a08hHKgvk+7NCogqBtiFUYVJ8R6EZ7VDDI4FtV7IwtlzhKiuShWp+wmuae5
  // dTlg6DIG2NY1ecIoxnpPDwZcfvQY9NGrjhKvK96IFhx2FGn0
  // -----END CERTIFICATE-----

  // Output the X509 certificate instance to a string of its ASN.1 encoding
  console.log(cert.toString("asn"));
  // SEQUENCE :
  //   SEQUENCE :
  //     [0] :
  //       INTEGER : 2
  //     INTEGER : 1
  //     SEQUENCE :
  //       OBJECT IDENTIFIER : 1.2.840.113549.1.1.11
  //       NULL
  //     SEQUENCE :
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.3
  //           PrintableString : 'Test certificate'
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.10
  //           PrintableString : 'Test'
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.7
  //           PrintableString : 'US'
  //     SEQUENCE :
  //       UTCTime : 2023-02-13T00:00:00.000Z
  //       UTCTime : 2024-02-13T00:00:00.000Z
  //     SEQUENCE :
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.3
  //           PrintableString : 'Test certificate'
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.10
  //           PrintableString : 'Test'
  //       SET :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.4.7
  //           PrintableString : 'US'
  //     SEQUENCE :
  //       SEQUENCE :
  //         OBJECT IDENTIFIER : 1.2.840.113549.1.1.1
  //         NULL
  //       BIT STRING :
  //         SEQUENCE :
  //           INTEGER : 16907625843071236730273798599784...07403902160217604280620554216194038203
  //           INTEGER : 65537
  //     [3] :
  //       SEQUENCE :
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.29.15
  //           BOOLEAN : getValue() {
  //                   return this.valueBlock.value;
  //               }
  //           OCTET STRING :
  //             BIT STRING : 11
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.29.19
  //           BOOLEAN : getValue() {
  //                   return this.valueBlock.value;
  //               }
  //           OCTET STRING :
  //             SEQUENCE :
  //               INTEGER : 0
  //         SEQUENCE :
  //           OBJECT IDENTIFIER : 2.5.29.32
  //           OCTET STRING :
  //             SEQUENCE :
  //               SEQUENCE :
  //                 OBJECT IDENTIFIER : 1.2.3.4.5.6
  //   SEQUENCE :
  //     OBJECT IDENTIFIER : 1.2.840.113549.1.1.11
  //     NULL
  //   BIT STRING : 000101111001001010100100100000000...1100001110001110110000101000110100111110100
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
