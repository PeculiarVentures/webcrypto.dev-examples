import { Crypto } from "@peculiar/webcrypto";
import * as xades from "xadesjs";

async function main() {
  // Set crypto engine for XML module
  const crypto = new Crypto();
  xades.Application.setEngine("NodeJS", crypto);

  const xmlSigned = [
    "<root>",
    "  <header>",
    "    <title>Example</title>",
    "  </header>",
    "  <body>",
    "    <text>Data</text>",
    "  </body>",
    `<ds:Signature Id="id-936fa78db7a8" xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha512"/><ds:DigestValue>KgDZLOqn82MK1Z+A9JMUQSKv5I0vKWPLKzDm+k1xdRIQy40dRbd5flRA1NTMFn+VJYArsXteChDwTcyaTUPHug==</ds:DigestValue></ds:Reference><ds:Reference URI="#xades-id-936fa78db7a8" Type="http://uri.etsi.org/01903#SignedProperties"><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>rl7eodlEX0yU1+lpUO2JQ9JYYy5hUiRc/MUCrRYgZEw=</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>FPG52j98cloGWfbT8muLH60R2XSYPanYJ05K/HAEhDB6nhK1d/IxRY6Wc8bZJ8QJrqtUagVpBT6lR//2uhB7cZ7M/u3o6LVDGF6GIujljF1qJJ9RvFLLccnlIyQb05DloJNqL7kD6RU31wW43vpXdwXMB47gccI6R9vm4UT4V5XxL+XB5CkiVDdSc1wozpMJ0kLrsKcQX51q/YyFMGud/Rj/B/xZAhK5jPyKQ9GB1ODMfmNqZpjoA//Ee7Iq60f4l4e9XXN+ZZmDCHygl36NL1gqn8Y+jVpyt7zbzBqTgDKJamVwfOvNWa3njHcN7rJo7OvpWAIJeS6yBic/lFzRBQ==</ds:SignatureValue><ds:KeyInfo><ds:X509Data><ds:X509Certificate>MIICzzCCAbegAwIBAgIBATANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDExRJbnRlcm1lZGlhdGUgQ0EgIzIuMTAeFw0xOTEyMzEyMzAwMDBaFw0yMDAxMDEyMzAwMDBaMBQxEjAQBgNVBAMTCUNsaWVudCAjMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ7B5Lz1S7D5nrbiWgp/WKTRK8sUF5E888uK6KBzkUhnXQz6vvw07npzSlPsqLl+yGebo91YEzkKl2VoPCC06I6fCTw8SvOcam8O4dnvJPKcD58Ovh62tdhVfd+SoWkZYq7v1qgsHEFNVsJaC/NdPSvxFEWN3rp/jBz7XbgUXfcCUdF0AMF3zcK1B43OBfFVbat5kRmQ1neobYXC1oUQ0gSxK+aXcK1d/6JAH5dnhL7LkG0l1zKIjON9zx4ncEX34xe3hgjTgHod3wZMoZStINaRIKb/0pKgM0muc0ztO1Tobh9ptKUBVwU90dfkljUQJPzZ6ebxsGuxmiGq1CSe2xsCAwEAAaMhMB8wHQYDVR0OBBYEFFdl/SxI8thcBo63c/dTwMAuzLd2MA0GCSqGSIb3DQEBCwUAA4IBAQCkmk+zSz+VRBXXBECrdHEnfyGtCfkA/ThKTlvLyXD2J8/kiIoJiwALFVXD4cp+4CCpbSrFHlfbN6vM1PQ1ZFDWDehQif29Z6c/J6eYggR/1kyg69cvfKfRotODfT7hbuN4X8CrWAqn15Y2+lqR6T7ExYIO2JtSEEJUN57Dy09XwkZocCo6oXRhFOAvk9Tb+iHL4YF+6hfmzr4q6kC0naR6D/TazYXjfPIwlq2rP7Q1DYJkGv5KmyMj04JfgShU7lRFzhuYr9XFlMyTe96/V8Nwg6pmmASeuvV4MsAFo20CTXwDgO/BgFgNnYYuu9RxPmS4oBT22uRXJrbp4yp6sEQc</ds:X509Certificate></ds:X509Data></ds:KeyInfo><ds:Object><xades:QualifyingProperties Target="#id-936fa78db7a8" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#"><xades:SignedProperties Id="xades-id-936fa78db7a8"><xades:SignedSignatureProperties><xades:SigningTime>2023-02-20T21:11:19.494Z</xades:SigningTime><xades:SigningCertificate><xades:Cert><xades:CertDigest><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>3gCKaM9Zvt7uH9IcT4EB2Gla8QHRPDFOkNataXhiFzk=</ds:DigestValue></xades:CertDigest><xades:IssuerSerial><ds:X509IssuerName>CN=Intermediate CA #2.1</ds:X509IssuerName><ds:X509SerialNumber>1</ds:X509SerialNumber></xades:IssuerSerial></xades:Cert></xades:SigningCertificate><xades:SignatureProductionPlace><xades:City>City</xades:City><xades:StateOrProvince>State</xades:StateOrProvince><xades:PostalCode>Code</xades:PostalCode><xades:CountryName>Country</xades:CountryName></xades:SignatureProductionPlace><xades:SignerRole><xades:ClaimedRoles><xades:ClaimedRole>Some role</xades:ClaimedRole></xades:ClaimedRoles></xades:SignerRole></xades:SignedSignatureProperties></xades:SignedProperties></xades:QualifyingProperties></ds:Object></ds:Signature></root>`,
  ].join("\n");

  const doc = xades.Parse(xmlSigned);
  const signature = doc.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");

  const signedXml = new xades.SignedXml(doc);
  signedXml.LoadXml(signature[0]);

  const ok = await signedXml.Verify();
  console.log("Signature:", ok); // Signature: true
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
