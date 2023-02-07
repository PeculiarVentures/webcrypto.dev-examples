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

    // Look for the objects with the specified CKA_ID
    softHSM.C_FindObjectsInit(session, [
      { type: pkcs11.CKA_ID, value: Buffer.from("b40bd39f0503faade3173c12ca5085c0", "hex") },
    ]);
    const handles = softHSM.C_FindObjects(session, 5);
    softHSM.C_FindObjectsFinal(session);

    if (handles.length) {
      // Print CKA_CLASS for the found objects
      for (const handle of handles) {
        const attrClass = softHSM.C_GetAttributeValue(session, handle, [{ type: pkcs11.CKA_CLASS }])[0];
        if (!Buffer.isBuffer(attrClass.value)) {
          continue;
        }

        const attrClassReader = new DataView(attrClass.value.buffer);
        const attrClassValue = attrClassReader.getUint32(0, true);
        switch (attrClassValue) {
          case pkcs11.CKO_CERTIFICATE:
            console.log("CKO_CERTIFICATE");
            break;
          case pkcs11.CKO_PRIVATE_KEY:
            console.log("CKO_PRIVATE_KEY key");
            break;
          case pkcs11.CKO_PUBLIC_KEY:
            console.log("CKO_PUBLIC_KEY key");
            break;
        }
      }
    } else {
      console.log("The objects with the specified CKA_ID were not found.");
    }

  } finally {
    softHSM.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
