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

    // Generate RSA key
    const keys = softHSM.C_GenerateKeyPair(
      session,
      // Mechanism
      {
        mechanism: pkcs11.CKM_RSA_PKCS_KEY_PAIR_GEN,
      },
      // Public key template
      [
        { type: pkcs11.CKA_CLASS, value: pkcs11.CKO_PUBLIC_KEY },
        { type: pkcs11.CKA_PUBLIC_EXPONENT, value: Buffer.from([1, 0, 1]) },
        { type: pkcs11.CKA_MODULUS_BITS, value: 2048 },
        { type: pkcs11.CKA_TOKEN, value: false },
        { type: pkcs11.CKA_VERIFY, value: true },
      ],
      // Private key template
      [
        { type: pkcs11.CKA_CLASS, value: pkcs11.CKO_PRIVATE_KEY },
        { type: pkcs11.CKA_PRIVATE, value: true },
        { type: pkcs11.CKA_SENSITIVE, value: true },
        { type: pkcs11.CKA_TOKEN, value: true }, // Add the private token to the token
        { type: pkcs11.CKA_SIGN, value: true },
      ]);

    // Sign the data using the generated key
    const data = Buffer.from("Some data to sign");
    softHSM.C_SignInit(session, { mechanism: pkcs11.CKM_SHA256_RSA_PKCS }, keys.privateKey);
    const signature = softHSM.C_Sign(session, data, Buffer.alloc(2048));
    console.log(signature);

    // Verify the signed data
    softHSM.C_VerifyInit(session, { mechanism: pkcs11.CKM_SHA256_RSA_PKCS }, keys.publicKey);
    const ok = softHSM.C_Verify(session, data, signature);
    console.log("Signature:", ok); // Signature: true
  } finally {
    softHSM.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
