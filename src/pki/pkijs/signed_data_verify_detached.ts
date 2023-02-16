
import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const pemCms = [
    "MIIEqQYJKoZIhvcNAQcCoIIEmjCCBJYCAQExDzANBglghkgBZQMEAgEFADALBgkq",
    "hkiG9w0BBwGgggLTMIICzzCCAbegAwIBAgIBATANBgkqhkiG9w0BAQsFADAfMR0w",
    "GwYDVQQDExRJbnRlcm1lZGlhdGUgQ0EgIzIuMTAeFw0xOTEyMzEyMzAwMDBaFw0y",
    "MDAxMDEyMzAwMDBaMBQxEjAQBgNVBAMTCUNsaWVudCAjMjCCASIwDQYJKoZIhvcN",
    "AQEBBQADggEPADCCAQoCggEBAJ7B5Lz1S7D5nrbiWgp/WKTRK8sUF5E888uK6KBz",
    "kUhnXQz6vvw07npzSlPsqLl+yGebo91YEzkKl2VoPCC06I6fCTw8SvOcam8O4dnv",
    "JPKcD58Ovh62tdhVfd+SoWkZYq7v1qgsHEFNVsJaC/NdPSvxFEWN3rp/jBz7XbgU",
    "XfcCUdF0AMF3zcK1B43OBfFVbat5kRmQ1neobYXC1oUQ0gSxK+aXcK1d/6JAH5dn",
    "hL7LkG0l1zKIjON9zx4ncEX34xe3hgjTgHod3wZMoZStINaRIKb/0pKgM0muc0zt",
    "O1Tobh9ptKUBVwU90dfkljUQJPzZ6ebxsGuxmiGq1CSe2xsCAwEAAaMhMB8wHQYD",
    "VR0OBBYEFFdl/SxI8thcBo63c/dTwMAuzLd2MA0GCSqGSIb3DQEBCwUAA4IBAQCk",
    "mk+zSz+VRBXXBECrdHEnfyGtCfkA/ThKTlvLyXD2J8/kiIoJiwALFVXD4cp+4CCp",
    "bSrFHlfbN6vM1PQ1ZFDWDehQif29Z6c/J6eYggR/1kyg69cvfKfRotODfT7hbuN4",
    "X8CrWAqn15Y2+lqR6T7ExYIO2JtSEEJUN57Dy09XwkZocCo6oXRhFOAvk9Tb+iHL",
    "4YF+6hfmzr4q6kC0naR6D/TazYXjfPIwlq2rP7Q1DYJkGv5KmyMj04JfgShU7lRF",
    "zhuYr9XFlMyTe96/V8Nwg6pmmASeuvV4MsAFo20CTXwDgO/BgFgNnYYuu9RxPmS4",
    "oBT22uRXJrbp4yp6sEQcMYIBmjCCAZYCAQAwJDAfMR0wGwYDVQQDExRJbnRlcm1l",
    "ZGlhdGUgQ0EgIzIuMQIBATANBglghkgBZQMEAgEFAKBLMBgGCSqGSIb3DQEJAzEL",
    "BgkqhkiG9w0BBwEwLwYJKoZIhvcNAQkEMSIEID8KN3ugpKRg7LYW9lB84NjPo+cE",
    "Al1P2j7QxcoFRocoMAsGCSqGSIb3DQEBCwSCAQBwEqhYM9OYplzrk2K1vrXzQC0M",
    "M8sZtzfXCJBj1paIGCE91fDI1NYmeekzikZgzehbTEI/eMOgrnVJIJjlQC+ShY1z",
    "aXRMuJGN5q4g+mEB6/WTxudOr8Fg+sA+g3mew09UJ9b+a6MPFdrwl4P1H5P2Olat",
    "fa0FAuqVMOHWFvl7YtFpLMdl5Z18FaXezCIsPJ5ez8tiMb9F3bj0CN/6RRdm8m3w",
    "IEaPYCk8UupFffMkhhboIzn58KCR5l54XiKewF+/CWsFG4zqWyjtN9uyCffupggE",
    "Vh9+LZWjjc6Ek0dL4igL6x5FW/Lyrij25qfrI9Q82L0O1kEQpdF+PZiWaPP0",
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
    data: Buffer.from("test message"),
  });
  console.log("Signature:", ok);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
