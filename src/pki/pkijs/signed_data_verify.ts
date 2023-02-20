
import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const pemCms = [
    "MIIEbgYJKoZIhvcNAQcCoIIEXzCCBFsCAQExDzANBglghkgBZQMEAgEFADAdBgkq",
    "hkiG9w0BBwGgECQOBAx0ZXN0IG1lc3NhZ2WgggLTMIICzzCCAbegAwIBAgIBATAN",
    "BgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDExRJbnRlcm1lZGlhdGUgQ0EgIzIuMTAe",
    "Fw0xOTEyMzEyMzAwMDBaFw0yMDAxMDEyMzAwMDBaMBQxEjAQBgNVBAMTCUNsaWVu",
    "dCAjMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ7B5Lz1S7D5nrbi",
    "Wgp/WKTRK8sUF5E888uK6KBzkUhnXQz6vvw07npzSlPsqLl+yGebo91YEzkKl2Vo",
    "PCC06I6fCTw8SvOcam8O4dnvJPKcD58Ovh62tdhVfd+SoWkZYq7v1qgsHEFNVsJa",
    "C/NdPSvxFEWN3rp/jBz7XbgUXfcCUdF0AMF3zcK1B43OBfFVbat5kRmQ1neobYXC",
    "1oUQ0gSxK+aXcK1d/6JAH5dnhL7LkG0l1zKIjON9zx4ncEX34xe3hgjTgHod3wZM",
    "oZStINaRIKb/0pKgM0muc0ztO1Tobh9ptKUBVwU90dfkljUQJPzZ6ebxsGuxmiGq",
    "1CSe2xsCAwEAAaMhMB8wHQYDVR0OBBYEFFdl/SxI8thcBo63c/dTwMAuzLd2MA0G",
    "CSqGSIb3DQEBCwUAA4IBAQCkmk+zSz+VRBXXBECrdHEnfyGtCfkA/ThKTlvLyXD2",
    "J8/kiIoJiwALFVXD4cp+4CCpbSrFHlfbN6vM1PQ1ZFDWDehQif29Z6c/J6eYggR/",
    "1kyg69cvfKfRotODfT7hbuN4X8CrWAqn15Y2+lqR6T7ExYIO2JtSEEJUN57Dy09X",
    "wkZocCo6oXRhFOAvk9Tb+iHL4YF+6hfmzr4q6kC0naR6D/TazYXjfPIwlq2rP7Q1",
    "DYJkGv5KmyMj04JfgShU7lRFzhuYr9XFlMyTe96/V8Nwg6pmmASeuvV4MsAFo20C",
    "TXwDgO/BgFgNnYYuu9RxPmS4oBT22uRXJrbp4yp6sEQcMYIBTTCCAUkCAQAwJDAf",
    "MR0wGwYDVQQDExRJbnRlcm1lZGlhdGUgQ0EgIzIuMQIBATANBglghkgBZQMEAgEF",
    "ADALBgkqhkiG9w0BAQsEggEAM1Mp/l0Flw8vc20qpe8wquLR2PzE4pwZ4/rgUelr",
    "YvXwnN/IVDowtn8oJKoCIEEkh+UVXOCTj8psrEHPzkxd3KirkQbHB5x6mMN+J1JN",
    "SWEPKtKYVEsrSB5MMO1PUJ8/bpx1E8NayZ3bMg574+RJFM6+XDVd20SMafHAYpF1",
    "9yh0sId/rxeZ+8OBu5pqe8d77BmVDTuMsdP7I3LJNz9ydQOLIvNPLu8vgGukDFBK",
    "jtL6GpjdBJaaLZRNG+Th5ZW8hurVGtGTDBiJPe0ae31HUgsyzwVNDRvkYG9bb3Mg",
    "cOFMaJfNMTybPdbiozWiWO39Z81Mp5612gwxKITR+/lwQg==",
  ].join("");

  // Read a CMS Signed Data
  const contentInfo = pkijs.ContentInfo.fromBER(Buffer.from(pemCms, "base64"));
  if (contentInfo.contentType !== pkijs.ContentInfo.SIGNED_DATA) {
    throw new Error("CMS is not Signed Data.");
  }
  const cmsSigned = new pkijs.SignedData({ schema: contentInfo.content });

  // Verify the CMS signature
  const ok = await cmsSigned.verify({
    signer: 0,
  });
  console.log("Signature:", ok);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
