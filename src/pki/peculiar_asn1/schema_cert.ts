import * as asn1 from "@peculiar/asn1-schema";
import { Certificate } from "@peculiar/asn1-x509";

async function main() {
  const raw = Buffer.from("MIICwDCCAaigAwIBAgIBATANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDExBUZXN0IGNlcnRpZmljYXRlMB4XDTIzMDIwNzE4NDA1MloXDTI0MDIwNzE4NDA1MlowGzEZMBcGA1UEAxMQVGVzdCBjZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ6Kdnpnnu6SXYy0gxeZH8vvzamulwOcXLQ7C4XiWiZAEukZfGZTQDvC_kKGsMuGDAIlsysMH1tGl4V3lYYKbJ93mZkBVvlooaaJ_0GEekWMiM4h4QWpSDEc5XYEj6g1j_nDlfM0Hvp_1qxCTOECRmbmDQTJfumHvZtHKR6fdh2nfXb1A_b765KOTzzlxZ1Tdl6HPwo8NB5H5pPrhunX1cVYyLxs2q6Icw-8Bj5O5HuzRElQf7726aicVs34bb25R7ZYgfII8mfA1DK6Ns0xU456GsuKSpEPD_rzye8b2w2GLdimjwB8vmxZDwHB_z4AmAaR349gbzcdUPv2LhfnYRUCAwEAAaMPMA0wCwYDVR0PBAQDAgCAMA0GCSqGSIb3DQEBCwUAA4IBAQAQ3Vv6V1Be2FOavJDENBf5G_mQ01Jq1MCD-qvWXKf3GHzjv_Y-0Kb-tiEXhOfNPApxFJ9v5lzwkfyPutYipSEKvAt61EeGBCpacrW5qo52-i9U0R0i3rQVZTe4S7eUMujoXFM8aqbRe_ISJ9bH0NK4pU8yhPpA3AJJHcC-PPS9NB-l3KAw5JkXhKx4O8U2uRZDJae1VTewzb7V4zbefAjqK1WvQ7it4tPJ6qba05T7R23JOCGgNZlPjTCPSxUhmJg-2M-94jxHo-pf1Fcz1G61DwdDk4F3HVRXgCmtCtQzT464zZ-mWx13mpBARQBNpEx5dQEut9OCxfDAFAkoT6LR", "base64url");

  // Create new CertificateTemplate instance from the raw array
  const cert = asn1.AsnConvert.parse(raw, Certificate);

  console.log(cert);
  // Certificate {
  //   tbsCertificate: TBSCertificate {
  //     version: 2,
  //     serialNumber: Uint8Array(1) [ 1 ],
  //     signature: AlgorithmIdentifier {
  //       algorithm: '1.2.840.113549.1.1.11',
  //       parameters: null
  //     },
  //     issuer: Name(1) [ [RelativeDistinguishedName] ],
  //     validity: Validity { notBefore: [Time], notAfter: [Time] },
  //     subject: Name(1) [ [RelativeDistinguishedName] ],
  //     subjectPublicKeyInfo: SubjectPublicKeyInfo {
  //       algorithm: [AlgorithmIdentifier],
  //       subjectPublicKey: [Uint8Array]
  //     },
  //     extensions: Extensions(1) [ [Extension] ]
  //   },
  //   signatureAlgorithm: AlgorithmIdentifier {
  //     algorithm: '1.2.840.113549.1.1.11',
  //     parameters: null
  //   },
  //   signatureValue: Uint8Array(256) [
  //      16, 221,  91, 250,  87,  80,  94, 216,  83, 154, 188, 144,
  //     196,  52,  23, 249,  27, 249, 144, 211,  82, 106, 212, 192,
  //     131, 250, 171, 214,  92, 167, 247,  24, 124, 227, 191, 246,
  //      62, 208, 166, 254, 182,  33,  23, 132, 231, 205,  60,  10,
  //     113,  20, 159, 111, 230,  92, 240, 145, 252, 143, 186, 214,
  //      34, 165,  33,  10, 188,  11, 122, 212,  71, 134,   4,  42,
  //      90, 114, 181, 185, 170, 142, 118, 250,  47,  84, 209,  29,
  //      34, 222, 180,  21, 101,  55, 184,  75, 183, 148,  50, 232,
  //     232,  92,  83,  60,
  //     ... 156 more items
  //   ]
  // }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
