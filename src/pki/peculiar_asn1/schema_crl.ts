import * as asn1 from "@peculiar/asn1-schema";
import { CertificateList } from "@peculiar/asn1-x509";

async function main() {
  const raw = Buffer.from([
    "MIICADCB6QIBATANBgkqhkiG9w0BAQsFADBAMQswCQYDVQQGEwJVUzEfMB0GA1UE",
    "ChMWVGVzdCBDZXJ0aWZpY2F0ZXMgMjAxMTEQMA4GA1UEAxMHR29vZCBDQRcNMTAw",
    "MTAxMDgzMDAwWhcNMzAxMjMxMDgzMDAwWjBEMCACAQ4XDTEwMDEwMTA4MzAwMFow",
    "DDAKBgNVHRUEAwoBATAgAgEPFw0xMDAxMDEwODMwMDFaMAwwCgYDVR0VBAMKAQGg",
    "LzAtMB8GA1UdIwQYMBaAFFgBhCQbvCtSlEo9pRByFFH1rzrJMAoGA1UdFAQDAgEB",
    "MA0GCSqGSIb3DQEBCwUAA4IBAQA9vPMLiinD8G7FaoTsu8T2jUrTi1OLPHxKnrlB",
    "rAP/eHa+VQV1HJfY5Gjq1dpNgzZqDIgQM5QHPm0aSgMN7Ultx+XzbxRswLnwgQrZ",
    "7f76Tlky1I+jz7/p3AEynrNR72v64SZt46UhpSuWBHoF1uEVtgirTZNfOEaGUJTN",
    "OaTA5U55/iw9BKjHN0e/Vd7OGnrk5h6FsgWOiasGn6/tym9teDt/L2hlOdsZsvX1",
    "KPc0ExUHVjJIUBYTooqyy/CuTzFHla6RYVYvJuRF5qYCxa0GTZK3ImCtJ3XfsGdf",
    "LEJDZ7T17xBQHucMvIVLm6vY44WUy7PqQhZJskhJMEvj01ZE",
  ].join(""), "base64");

  // Create new CertificateList instance from the raw array
  const crl = asn1.AsnConvert.parse(raw, CertificateList);

  // Output the CertificateList instance
  console.log(crl);
  // CertificateList {
  //   tbsCertList: TBSCertList {
  //     signature: AlgorithmIdentifier {
  //       algorithm: '1.2.840.113549.1.1.11',
  //       parameters: null
  //     },
  //     issuer: Name(3) [
  //       [RelativeDistinguishedName],
  //       [RelativeDistinguishedName],
  //       [RelativeDistinguishedName]
  //     ],
  //     thisUpdate: Time { utcTime: 2010-01-01T08:30:00.000Z },
  //     version: 1,
  //     nextUpdate: Time { utcTime: 2030-12-31T08:30:00.000Z },
  //     revokedCertificates: [ [RevokedCertificate], [RevokedCertificate] ],
  //     crlExtensions: [ [Extension], [Extension] ]
  //   },
  //   signatureAlgorithm: AlgorithmIdentifier {
  //     algorithm: '1.2.840.113549.1.1.11',
  //     parameters: null
  //   },
  //   signature: Uint8Array(256) [
  //      61, 188, 243,  11, 138,  41, 195, 240, 110, 197, 106, 132,
  //     236, 187, 196, 246, 141,  74, 211, 139,  83, 139,  60, 124,
  //      74, 158, 185,  65, 172,   3, 255, 120, 118, 190,  85,   5,
  //     117,  28, 151, 216, 228, 104, 234, 213, 218,  77, 131,  54,
  //     106,  12, 136,  16,  51, 148,   7,  62, 109,  26,  74,   3,
  //      13, 237,  73, 109, 199, 229, 243, 111,  20, 108, 192, 185,
  //     240, 129,  10, 217, 237, 254, 250,  78,  89,  50, 212, 143,
  //     163, 207, 191, 233, 220,   1,  50, 158, 179,  81, 239, 107,
  //     250, 225,  38, 109,
  //     ... 156 more items
  //   ]
  // }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
