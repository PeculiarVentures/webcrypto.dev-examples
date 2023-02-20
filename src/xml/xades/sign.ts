import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";
import * as xades from "xadesjs";

async function main() {
  // Set crypto engine for XML module
  const crypto = new Crypto();
  xades.Application.setEngine("NodeJS", crypto);

  // Set crypto engine for X509 module
  x509.cryptoProvider.set(crypto);

  const pemLeaf = [
    "MIICzzCCAbegAwIBAgIBATANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDExRJbnRl",
    "cm1lZGlhdGUgQ0EgIzIuMTAeFw0xOTEyMzEyMzAwMDBaFw0yMDAxMDEyMzAwMDBa",
    "MBQxEjAQBgNVBAMTCUNsaWVudCAjMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC",
    "AQoCggEBAJ7B5Lz1S7D5nrbiWgp/WKTRK8sUF5E888uK6KBzkUhnXQz6vvw07npz",
    "SlPsqLl+yGebo91YEzkKl2VoPCC06I6fCTw8SvOcam8O4dnvJPKcD58Ovh62tdhV",
    "fd+SoWkZYq7v1qgsHEFNVsJaC/NdPSvxFEWN3rp/jBz7XbgUXfcCUdF0AMF3zcK1",
    "B43OBfFVbat5kRmQ1neobYXC1oUQ0gSxK+aXcK1d/6JAH5dnhL7LkG0l1zKIjON9",
    "zx4ncEX34xe3hgjTgHod3wZMoZStINaRIKb/0pKgM0muc0ztO1Tobh9ptKUBVwU9",
    "0dfkljUQJPzZ6ebxsGuxmiGq1CSe2xsCAwEAAaMhMB8wHQYDVR0OBBYEFFdl/SxI",
    "8thcBo63c/dTwMAuzLd2MA0GCSqGSIb3DQEBCwUAA4IBAQCkmk+zSz+VRBXXBECr",
    "dHEnfyGtCfkA/ThKTlvLyXD2J8/kiIoJiwALFVXD4cp+4CCpbSrFHlfbN6vM1PQ1",
    "ZFDWDehQif29Z6c/J6eYggR/1kyg69cvfKfRotODfT7hbuN4X8CrWAqn15Y2+lqR",
    "6T7ExYIO2JtSEEJUN57Dy09XwkZocCo6oXRhFOAvk9Tb+iHL4YF+6hfmzr4q6kC0",
    "naR6D/TazYXjfPIwlq2rP7Q1DYJkGv5KmyMj04JfgShU7lRFzhuYr9XFlMyTe96/",
    "V8Nwg6pmmASeuvV4MsAFo20CTXwDgO/BgFgNnYYuu9RxPmS4oBT22uRXJrbp4yp6",
    "sEQc",
  ].join("");

  const pemPkcs8 = [
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCeweS89Uuw+Z62",
    "4loKf1ik0SvLFBeRPPPLiuigc5FIZ10M+r78NO56c0pT7Ki5fshnm6PdWBM5Cpdl",
    "aDwgtOiOnwk8PErznGpvDuHZ7yTynA+fDr4etrXYVX3fkqFpGWKu79aoLBxBTVbC",
    "WgvzXT0r8RRFjd66f4wc+124FF33AlHRdADBd83CtQeNzgXxVW2reZEZkNZ3qG2F",
    "wtaFENIEsSvml3CtXf+iQB+XZ4S+y5BtJdcyiIzjfc8eJ3BF9+MXt4YI04B6Hd8G",
    "TKGUrSDWkSCm/9KSoDNJrnNM7TtU6G4fabSlAVcFPdHX5JY1ECT82enm8bBrsZoh",
    "qtQkntsbAgMBAAECggEAR/JeG8Zc1ajipUYigTRiM1t6KdACuDbz05AxyZlmQ3ZY",
    "hKvURs8kLok2K5+KfXo4D0BJPGQQXh7vKq1Y5oemBxCK6mn2m72MvKT1dMM8rthL",
    "+gz/20J5Wb+wylQU42D2SIp38QIAkhWfFnghh1p/gP0B712SjVmFYZMHT4enZ+vE",
    "67DVQtNMuQIqnsCOk/lnFEvVWnIAUJEz+BPv+9LZZ+F7XYVQ47+1BiUmc2GdFWzJ",
    "NKymbty4HAD4SoQeZrjACuQCeeSjLXk9gjvf1CziKF2locfZPM/uI5YLL3Ativwg",
    "J7hvELSm1rCgiR4PlxBxdXobh2TuxsJF/L6MbAviPQKBgQDgXQOl+/jv7mniWEJY",
    "D9wYBTw1WfzXe94BX5VgDnz+slgHhzvf7brWan2jRoqGSaSupufxdY+wrpWKgOYf",
    "mCHlwvc7cckuTgBm056nsydtnuCCKmCnVquzQuu2fBXbfwAAdKrOEfB3hKKE+Pky",
    "Di+JyMqHSaR0eyJb+8SFe0hXJQKBgQC1JKj1XyYDYIBu/wApvJm0RosxxzY6UreQ",
    "HHBA+kh216KQbesm9ltOtqGX3PdqwFBkShf/P0QFfdkgIx1svIxB0K4gjdngCJLk",
    "O8l3kpsNPZQhzcGU5L4iPjmP4hKYEA6g13HvjOR+61LSfraibh3E6uTV6EX/J3XU",
    "qNlslk/1PwKBgQC2yfDb/OH+D54CQueiOSGWDEXWLX85y3e+ZLIc9RDOrFvdnkag",
    "lFzgrRe4uxLGfx8FD4PuC1pKlqHMmmFhoh8TwniL3JML/46CN6yNcf8QZxz/zyi5",
    "jHoMbNv+6y8fiWNl+6bghmsD5HJHpVPYfQgr2ANwnwW1xE/k4sRj/2GbZQKBgBUu",
    "Ly9Zq8kzTHEuEefPbK1+niH46CdTqrEIEjwWx8hVmGWI5LkOj0iZ5DUsmiV6TSwc",
    "2cd3r01xFKVEVdl0BnZfnyyhSXt/pSVYtErt8oFO1PZK57qwMGcynWpshb4QCpXV",
    "+zWGZOVOQMXqGRLPC14OFSnJ2f1msMln4NxoivrjAoGBAJBzZGHRAcD3rpxg7Flc",
    "rV1Rh3zn+QKTWmH1JDjkTGXTfsMB82vQXuQSXboT4sLLAw6x56Y7sSEhuBd7fT1E",
    "5WioiVEVwN5cGb+AcrDUJOmRC5hIMZEKGhtvEz7xMWK1mm0ad6YH1ogBq9AeNUhG",
    "QX5hOIrmLhbgp03ZEl82hy4D",
  ].join("");

  // Import certificate
  const leaf = new x509.X509Certificate(pemLeaf);

  // Import signing key
  const key = await crypto.subtle.importKey("pkcs8", Buffer.from(pemPkcs8, "base64"), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);

  const xml = [
    "<root>",
    "  <header>",
    "    <title>Example</title>",
    "  </header>",
    "  <body>",
    "    <text>Data</text>",
    "  </body>",
    "</root>",
  ].join("\n");
  const doc = xades.Parse(xml);

  const signature = new xades.SignedXml();

  await signature.Sign(                                 // Signing document
    { name: "RSASSA-PKCS1-v1_5" },                        // algorithm 
    key,                                                  // key 
    doc,                                                  // document
    {                                                     // options
      references: [
        { hash: "SHA-512", transforms: ["enveloped", "c14n"] },
      ],
      x509: [leaf.toString("base64")],
      // XAdES options
      productionPlace: {
        country: "Country",
        state: "State",
        city: "City",
        code: "Code",
      },
      signerRole: {
        claimed: ["Some role"],
      },
      signingCertificate: leaf.toString("base64"),
    });

  console.log(signature.toString());
  // Output (formatted)
  //
  // <root>
  //   <header>
  //     <title>Example</title>
  //   </header>
  //   <body>
  //     <text>Data</text>
  //   </body>
  //   <ds:Signature Id="id-936fa78db7a8"
  //     xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
  //     <ds:SignedInfo>
  //       <ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
  //       <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
  //       <ds:Reference>
  //         <ds:Transforms>
  //           <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
  //           <ds:Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
  //         </ds:Transforms>
  //         <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha512"/>
  //         <ds:DigestValue>KgDZLOqn82MK1Z+A9JMUQSKv5I0vKWPLKzDm+k1xdRIQy40dRbd5flRA1NTMFn+VJYArsXteChDwTcyaTUPHug==</ds:DigestValue>
  //       </ds:Reference>
  //       <ds:Reference URI="#xades-id-936fa78db7a8" Type="http://uri.etsi.org/01903#SignedProperties">
  //         <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
  //         <ds:DigestValue>rl7eodlEX0yU1+lpUO2JQ9JYYy5hUiRc/MUCrRYgZEw=</ds:DigestValue>
  //       </ds:Reference>
  //     </ds:SignedInfo>
  //     <ds:SignatureValue>FPG52j98cloGWfbT8muLH60R2XSYPanYJ05K/HAEhDB6nhK1d/IxRY6Wc8bZJ8QJrqtUagVpBT6lR//2uhB7cZ7M/u3o6LVDGF6GIujljF1qJJ9RvFLLccnlIyQb05DloJNqL7kD6RU31wW43vpXdwXMB47gccI6R9vm4UT4V5XxL+XB5CkiVDdSc1wozpMJ0kLrsKcQX51q/YyFMGud/Rj/B/xZAhK5jPyKQ9GB1ODMfmNqZpjoA//Ee7Iq60f4l4e9XXN+ZZmDCHygl36NL1gqn8Y+jVpyt7zbzBqTgDKJamVwfOvNWa3njHcN7rJo7OvpWAIJeS6yBic/lFzRBQ==</ds:SignatureValue>
  //     <ds:KeyInfo>
  //       <ds:X509Data>
  //         <ds:X509Certificate>MIICzzCCAbegAwIBAgIBATANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDExRJbnRlcm1lZGlhdGUgQ0EgIzIuMTAeFw0xOTEyMzEyMzAwMDBaFw0yMDAxMDEyMzAwMDBaMBQxEjAQBgNVBAMTCUNsaWVudCAjMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ7B5Lz1S7D5nrbiWgp/WKTRK8sUF5E888uK6KBzkUhnXQz6vvw07npzSlPsqLl+yGebo91YEzkKl2VoPCC06I6fCTw8SvOcam8O4dnvJPKcD58Ovh62tdhVfd+SoWkZYq7v1qgsHEFNVsJaC/NdPSvxFEWN3rp/jBz7XbgUXfcCUdF0AMF3zcK1B43OBfFVbat5kRmQ1neobYXC1oUQ0gSxK+aXcK1d/6JAH5dnhL7LkG0l1zKIjON9zx4ncEX34xe3hgjTgHod3wZMoZStINaRIKb/0pKgM0muc0ztO1Tobh9ptKUBVwU90dfkljUQJPzZ6ebxsGuxmiGq1CSe2xsCAwEAAaMhMB8wHQYDVR0OBBYEFFdl/SxI8thcBo63c/dTwMAuzLd2MA0GCSqGSIb3DQEBCwUAA4IBAQCkmk+zSz+VRBXXBECrdHEnfyGtCfkA/ThKTlvLyXD2J8/kiIoJiwALFVXD4cp+4CCpbSrFHlfbN6vM1PQ1ZFDWDehQif29Z6c/J6eYggR/1kyg69cvfKfRotODfT7hbuN4X8CrWAqn15Y2+lqR6T7ExYIO2JtSEEJUN57Dy09XwkZocCo6oXRhFOAvk9Tb+iHL4YF+6hfmzr4q6kC0naR6D/TazYXjfPIwlq2rP7Q1DYJkGv5KmyMj04JfgShU7lRFzhuYr9XFlMyTe96/V8Nwg6pmmASeuvV4MsAFo20CTXwDgO/BgFgNnYYuu9RxPmS4oBT22uRXJrbp4yp6sEQc</ds:X509Certificate>
  //       </ds:X509Data>
  //     </ds:KeyInfo>
  //     <ds:Object>
  //       <xades:QualifyingProperties Target="#id-936fa78db7a8"
  //         xmlns:xades="http://uri.etsi.org/01903/v1.3.2#">
  //         <xades:SignedProperties Id="xades-id-936fa78db7a8">
  //           <xades:SignedSignatureProperties>
  //             <xades:SigningTime>2023-02-20T21:11:19.494Z</xades:SigningTime>
  //             <xades:SigningCertificate>
  //               <xades:Cert>
  //                 <xades:CertDigest>
  //                   <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
  //                   <ds:DigestValue>3gCKaM9Zvt7uH9IcT4EB2Gla8QHRPDFOkNataXhiFzk=</ds:DigestValue>
  //                 </xades:CertDigest>
  //                 <xades:IssuerSerial>
  //                   <ds:X509IssuerName>CN=Intermediate CA #2.1</ds:X509IssuerName>
  //                   <ds:X509SerialNumber>1</ds:X509SerialNumber>
  //                 </xades:IssuerSerial>
  //               </xades:Cert>
  //             </xades:SigningCertificate>
  //             <xades:SignatureProductionPlace>
  //               <xades:City>City</xades:City>
  //               <xades:StateOrProvince>State</xades:StateOrProvince>
  //               <xades:PostalCode>Code</xades:PostalCode>
  //               <xades:CountryName>Country</xades:CountryName>
  //             </xades:SignatureProductionPlace>
  //             <xades:SignerRole>
  //               <xades:ClaimedRoles>
  //                 <xades:ClaimedRole>Some role</xades:ClaimedRole>
  //               </xades:ClaimedRoles>
  //             </xades:SignerRole>
  //           </xades:SignedSignatureProperties>
  //         </xades:SignedProperties>
  //       </xades:QualifyingProperties>
  //     </ds:Object>
  //   </ds:Signature>
  // </root>
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
