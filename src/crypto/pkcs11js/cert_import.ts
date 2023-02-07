import * as pkcs11 from "pkcs11js";

async function main() {
  const softHSM = new pkcs11.PKCS11();
  softHSM.load("/usr/local/lib/softhsm/libsofthsm2.so");

  softHSM.C_Initialize();

  try {
    // Get the first slot
    const slots = softHSM.C_GetSlotList(true);
    const slot = slots[0];

    // Open read-write session
    const session = softHSM.C_OpenSession(slot, pkcs11.CKF_SERIAL_SESSION | pkcs11.CKF_RW_SESSION);

    // Login
    softHSM.C_Login(session, pkcs11.CKU_USER, "12345");

    // Create X509 Certificate object (import certificate to the token)
    softHSM.C_CreateObject(session, [
      { type: pkcs11.CKA_CLASS, value: pkcs11.CKO_CERTIFICATE },
      { type: pkcs11.CKA_CERTIFICATE_TYPE, value: pkcs11.CKC_X_509 },
      { type: pkcs11.CKA_LABEL, value: "Test certificate" },
      { type: pkcs11.CKA_TOKEN, value: true },
      { type: pkcs11.CKA_ID, value: Buffer.from("tAvTnwUD-q3jFzwSylCFwA", "base64url") },
      { type: pkcs11.CKA_PRIVATE, value: false },
      { type: pkcs11.CKA_SERIAL_NUMBER, value: Buffer.from("AgEB", "base64url") },
      { type: pkcs11.CKA_ISSUER, value: Buffer.from("MBsxGTAXBgNVBAMTEFRlc3QgY2VydGlmaWNhdGU", "base64url") },
      { type: pkcs11.CKA_SUBJECT, value: Buffer.from("MBsxGTAXBgNVBAMTEFRlc3QgY2VydGlmaWNhdGU", "base64url") },
      { type: pkcs11.CKA_VALUE, value: Buffer.from("MIICwDCCAaigAwIBAgIBATANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDExBUZXN0IGNlcnRpZmljYXRlMB4XDTIzMDIwNzE4NDA1MloXDTI0MDIwNzE4NDA1MlowGzEZMBcGA1UEAxMQVGVzdCBjZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ6Kdnpnnu6SXYy0gxeZH8vvzamulwOcXLQ7C4XiWiZAEukZfGZTQDvC_kKGsMuGDAIlsysMH1tGl4V3lYYKbJ93mZkBVvlooaaJ_0GEekWMiM4h4QWpSDEc5XYEj6g1j_nDlfM0Hvp_1qxCTOECRmbmDQTJfumHvZtHKR6fdh2nfXb1A_b765KOTzzlxZ1Tdl6HPwo8NB5H5pPrhunX1cVYyLxs2q6Icw-8Bj5O5HuzRElQf7726aicVs34bb25R7ZYgfII8mfA1DK6Ns0xU456GsuKSpEPD_rzye8b2w2GLdimjwB8vmxZDwHB_z4AmAaR349gbzcdUPv2LhfnYRUCAwEAAaMPMA0wCwYDVR0PBAQDAgCAMA0GCSqGSIb3DQEBCwUAA4IBAQAQ3Vv6V1Be2FOavJDENBf5G_mQ01Jq1MCD-qvWXKf3GHzjv_Y-0Kb-tiEXhOfNPApxFJ9v5lzwkfyPutYipSEKvAt61EeGBCpacrW5qo52-i9U0R0i3rQVZTe4S7eUMujoXFM8aqbRe_ISJ9bH0NK4pU8yhPpA3AJJHcC-PPS9NB-l3KAw5JkXhKx4O8U2uRZDJae1VTewzb7V4zbefAjqK1WvQ7it4tPJ6qba05T7R23JOCGgNZlPjTCPSxUhmJg-2M-94jxHo-pf1Fcz1G61DwdDk4F3HVRXgCmtCtQzT464zZ-mWx13mpBARQBNpEx5dQEut9OCxfDAFAkoT6LR", "base64url") },
    ]);
  } finally {
    softHSM.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
