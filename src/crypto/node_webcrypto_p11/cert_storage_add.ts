import { Crypto, X509Certificate } from "node-webcrypto-p11";

async function main() {
  // Initialize the crypto engine
  const crypto = new Crypto({
    library: "/usr/local/lib/softhsm/libsofthsm2.so",
    name: "SoftHSM",
    slot: 0,
    pin: "12345",
    readWrite: true,
  });

  const certPem = [
    "-----BEGIN CERTIFICATE-----",
    "MIICwDCCAaigAwIBAgIBATANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDExBUZXN0",
    "IGNlcnRpZmljYXRlMB4XDTIzMDIwNzE4NDA1MloXDTI0MDIwNzE4NDA1MlowGzEZ",
    "MBcGA1UEAxMQVGVzdCBjZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEP",
    "ADCCAQoCggEBAJ6Kdnpnnu6SXYy0gxeZH8vvzamulwOcXLQ7C4XiWiZAEukZfGZT",
    "QDvC/kKGsMuGDAIlsysMH1tGl4V3lYYKbJ93mZkBVvlooaaJ/0GEekWMiM4h4QWp",
    "SDEc5XYEj6g1j/nDlfM0Hvp/1qxCTOECRmbmDQTJfumHvZtHKR6fdh2nfXb1A/b7",
    "65KOTzzlxZ1Tdl6HPwo8NB5H5pPrhunX1cVYyLxs2q6Icw+8Bj5O5HuzRElQf772",
    "6aicVs34bb25R7ZYgfII8mfA1DK6Ns0xU456GsuKSpEPD/rzye8b2w2GLdimjwB8",
    "vmxZDwHB/z4AmAaR349gbzcdUPv2LhfnYRUCAwEAAaMPMA0wCwYDVR0PBAQDAgCA",
    "MA0GCSqGSIb3DQEBCwUAA4IBAQAQ3Vv6V1Be2FOavJDENBf5G/mQ01Jq1MCD+qvW",
    "XKf3GHzjv/Y+0Kb+tiEXhOfNPApxFJ9v5lzwkfyPutYipSEKvAt61EeGBCpacrW5",
    "qo52+i9U0R0i3rQVZTe4S7eUMujoXFM8aqbRe/ISJ9bH0NK4pU8yhPpA3AJJHcC+",
    "PPS9NB+l3KAw5JkXhKx4O8U2uRZDJae1VTewzb7V4zbefAjqK1WvQ7it4tPJ6qba",
    "05T7R23JOCGgNZlPjTCPSxUhmJg+2M+94jxHo+pf1Fcz1G61DwdDk4F3HVRXgCmt",
    "CtQzT464zZ+mWx13mpBARQBNpEx5dQEut9OCxfDAFAkoT6LR",
    "-----END CERTIFICATE-----",
  ].join("\n");

  // Import the certificate
  const alg = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
  };
  const cert = await crypto.certStorage.importCert("pem", certPem, alg, ["verify"]);

  // Copy the certificate to the token
  await crypto.certStorage.setItem(cert);

  crypto.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
