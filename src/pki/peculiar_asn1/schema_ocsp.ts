import * as asn1 from "@peculiar/asn1-schema";
import { BasicOCSPResponse, OCSPResponse } from "@peculiar/asn1-ocsp";

async function main() {
  const raw = Buffer.from([
    "MIIEdwoBAKCCBHAwggRsBgkrBgEFBQcwAQEEggRdMIIEWTBmoSAwHjEcMAkGA1UE",
    "BhMCUlUwDwYDVQQDHggAVABlAHMAdBgTMjAyMzAyMTMxOTE3NTAuMzY0WjAtMCsw",
    "EjAHBgUrDgMCGgQBAQQBAQIBAYAAGBMyMDIzMDIxMzE5MTc1MC4zNjRaMAsGCSqG",
    "SIb3DQEBCwOCAQEAeKSy/ELYlbSced2ssalwn4EEsMLyXdkj+ZPliI/ra/atdwZz",
    "QYXVbTEidOPWEX3IqsNa3WDwjil1v7Wvv8IaeKAtp9racFPjlomUgGTlbpa4QCWS",
    "+YAvw9Q0jRP7v0rqZLGgOnGQ8uuG9GzcYQ1SH18DM7Jjk5mewOVY9Jq+l3dOgpGe",
    "7Sklv/SJCMa21WBhJ8BYQeuEm5A/VteOWRw4MbT3+GI5yOkduVO+/6Hz6tC6CBkC",
    "ioy2ufcJW5qVC5Wa4vLBkjAppHoqEI8KwZ+VY+8O7ssmRj0F9jgFDVIBCw/KcUuc",
    "vT6SKssuwlvTrTwwI0k1IEMKaaZFLUdWk/bK66CCAtswggLXMIIC0zCCAb2gAwIB",
    "AgIBATALBgkqhkiG9w0BAQswHjEcMAkGA1UEBhMCUlUwDwYDVQQDHggAVABlAHMA",
    "dDAeFw0yMzAyMTMxOTE3NTBaFw0yNDAyMTMxOTE3NTBaMB4xHDAJBgNVBAYTAlJV",
    "MA8GA1UEAx4IAFQAZQBzAHQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB",
    "AQDj9/g+O9L7TkrGAxEndDw9AF6yTFLSyV0kz++lJiJOCmOhu4gplwARjHWLD1mj",
    "6cDmmdDjLITboz8250FjHtSDhe1/9j92gJIugr+LDcXG9djc6bq7tmy6/EibRx5p",
    "IcyQDX4g3mCcDu+2a7C3fqQqysN8c7ppLXWJs/SO+78Y144+sD0zNdoCh397OUcU",
    "YWAtHCkC5CJiUSI9OCN2PB9MZWGxlihllSSnWB5/7TALcZG3zPL9JI6sWhHXExoV",
    "ZQQ4mTQ7j5DvoUEIvrjiwDt9Da2e73B/OTqk62bozjRkwlc6PgebeKq8Q3nlJKgU",
    "5nTzequJLOTHBvhAkfqhriDjAgMBAAGjIDAeMA8GA1UdEwQIMAYBAf8CAQMwCwYD",
    "VR0PBAQDAgAGMAsGCSqGSIb3DQEBCwOCAQEAWWtJ1f5oZXW+UCghvchCCIfilULc",
    "Aq2rs9zxiCdJ4/21RceeAFxi9Kh43yoll2oI4RcHe2QyFUiQbN3KbIMuMTP34u8X",
    "5hJS4jnwdUVNV31WgiVSRwoUthpSO6ojsXgouTC/CUjU0WbFOTBtN43ocKFF7UXg",
    "aS52j62fzFQkVPwsmhnjmMGm35I9+dxHYzxu8T+SQbMbwbfueOfm9XEjtdgn+hbS",
    "6Ch3ibecjNbn4Dvk3VLwJcgUsekNoAaVzIULQdZ/WzPDLefsStk/hSmBDNrWCMEa",
    "QUDpQ6cVgWg8M/b5tVZ+SIvZpO0HI0auzxkYzW93BUN3BKM+wBa6KIunHg==",
  ].join(""), "base64");

  // Create new OCSPResponse instance from the raw array
  const ocsp = asn1.AsnConvert.parse(raw, OCSPResponse);

  // Output the OCSPResponse instance
  console.log(ocsp);
  // OCSPResponse {
  //   responseStatus: 0,
  //   responseBytes: ResponseBytes {
  //     responseType: '1.3.6.1.5.5.7.48.1.1',
  //     response: OctetString { buffer: [ArrayBuffer] }
  //   }
  // }

  if (!ocsp.responseBytes) {
    throw new Error("Property `responseBytes` is missed in the OCSP response");
  }
  // Create new BasicOCSPResponse instance from the raw array
  const ocspResponse = asn1.AsnConvert.parse(ocsp.responseBytes.response, BasicOCSPResponse);

  // Output the BasicOCSPResponse instance
  console.log(ocspResponse);
  // BasicOCSPResponse {
  //   tbsResponseData: ResponseData {
  //     version: 0,
  //     responderID: ResponderID { byName: [Name] },
  //     producedAt: 2023-02-13T19:17:50.364Z,
  //     responses: [ [SingleResponse] ]
  //   },
  //   signatureAlgorithm: AlgorithmIdentifier { algorithm: '1.2.840.113549.1.1.11' },
  //   signature: Uint8Array(256) [
  //     120, 164, 178, 252,  66, 216, 149, 180, 156, 121, 221, 172,
  //     177, 169, 112, 159, 129,   4, 176, 194, 242,  93, 217,  35,
  //     249, 147, 229, 136, 143, 235, 107, 246, 173, 119,   6, 115,
  //      65, 133, 213, 109,  49,  34, 116, 227, 214,  17, 125, 200,
  //     170, 195,  90, 221,  96, 240, 142,  41, 117, 191, 181, 175,
  //     191, 194,  26, 120, 160,  45, 167, 218, 218, 112,  83, 227,
  //     150, 137, 148, 128, 100, 229, 110, 150, 184,  64,  37, 146,
  //     249, 128,  47, 195, 212,  52, 141,  19, 251, 191,  74, 234,
  //     100, 177, 160,  58,
  //     ... 156 more items
  //   ],
  //   certs: [
  //     Certificate {
  //       tbsCertificate: [TBSCertificate],
  //       signatureAlgorithm: [AlgorithmIdentifier],
  //       signatureValue: [Uint8Array]
  //     }
  //   ]
  // }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
