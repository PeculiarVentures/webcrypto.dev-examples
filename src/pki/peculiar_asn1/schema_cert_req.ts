import * as asn1 from "@peculiar/asn1-schema";
import { CertificationRequest } from "@peculiar/asn1-csr";

async function main() {
  const raw = Buffer.from([
    "MIIBHzCBxgIBADA3MRkwFwYDVQQDExBUZXN0IGNlcnRpZmljYXRlMQ0wCwYDVQQK",
    "EwRUZXN0MQswCQYDVQQHEwJVUzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABJV5",
    "AtILSlZBqlvX4YFPqHWnccQ8Fo2Egb5WyN38qlhxP77M31dWZSnRNv2ppdBF7sFI",
    "k/U6UZYKu4D4EDctO7GgLTArBgkqhkiG9w0BCQ4xHjAcMBoGA1UdEQQTMBGCD3Nv",
    "bWUuZG9tYWluLmNvbTAKBggqhkjOPQQDAgNIADBFAiBys+rSrr9z0wxW9bSaQP1R",
    "gs4POE+2o7+JqsDPAkg9IQIhAP2DZRA1IlLdJOYWWhxi35CrjuEkA7x9etWs8EMB",
    "QMlk",
  ].join(""), "base64url");

  // Create new CertificateRequest instance from the raw array
  const certRequest = asn1.AsnConvert.parse(raw, CertificationRequest);

  // Output the CertificateRequest instance
  console.log(certRequest);
  // CertificationRequest {
  //   certificationRequestInfo: CertificationRequestInfo {
  //     version: 0,
  //     subject: Name(3) [
  //       [RelativeDistinguishedName],
  //       [RelativeDistinguishedName],
  //       [RelativeDistinguishedName]
  //     ],
  //     subjectPKInfo: SubjectPublicKeyInfo {
  //       algorithm: [AlgorithmIdentifier],
  //       subjectPublicKey: [Uint8Array]
  //     },
  //     attributes: Attributes(1) [ [Attribute] ]
  //   },
  //   signatureAlgorithm: AlgorithmIdentifier { algorithm: '1.2.840.10045.4.3.2' },
  //   signature: Uint8Array(71) [
  //      48,  69,   2,  32, 114, 179, 234, 210, 174, 191, 115, 211,
  //      12,  86, 245, 180, 154,  64, 253,  81, 130, 206,  15,  56,
  //      79, 182, 163, 191, 137, 170, 192, 207,   2,  72,  61,  33,
  //       2,  33,   0, 253, 131, 101,  16,  53,  34,  82, 221,  36,
  //     230,  22,  90,  28,  98, 223, 144, 171, 142, 225,  36,   3,
  //     188, 125, 122, 213, 172, 240,  67,   1,  64, 201, 100
  //   ]
  // }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
