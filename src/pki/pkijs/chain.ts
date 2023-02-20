import { Crypto } from "@peculiar/webcrypto";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const pemLeaf = [
    "MIIDfDCCAmSgAwIBAgIBAjANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJVUzEf",
    "MB0GA1UEChMWVGVzdCBDZXJ0aWZpY2F0ZXMgMjAxMTEVMBMGA1UEAxMMVHJ1c3Qg",
    "QW5jaG9yMB4XDTEwMDEwMTA4MzAwMFoXDTMwMTIzMTA4MzAwMFowQDELMAkGA1UE",
    "BhMCVVMxHzAdBgNVBAoTFlRlc3QgQ2VydGlmaWNhdGVzIDIwMTExEDAOBgNVBAMT",
    "B0dvb2QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCQWJpHYo37",
    "Xfb7oJSPe+WvfTlzIG21WQ7MyMbGtK/m8mejCzR6c+f/pJhEH/OcDSMsXq8h5kXa",
    "BGqWK+vSwD/Pzp5OYGptXmGPcthDtAwlrafkGOS4GqIJ8+k9XGKs+vQUXJKsOk47",
    "RuzD6PZupq4s16xaLVqYbUC26UcY08GpnoLNHJZS/EmXw1ZZ3d4YZjNlpIpWFNHn",
    "UGmdiGKXUPX/9H0fVjIAaQwjnGAbpgyCumWgzIwPpX+ElFOUr3z7BoVnFKhIXze+",
    "VmQGSWxZxvWDUN90Ul0tLEpLgk3OVxUB4VUGuf15OJOpgo1xibINPmWt14Vda2N9",
    "yrNKloJGZNqLAgMBAAGjfDB6MB8GA1UdIwQYMBaAFOR9X9FclYYILAWuvnW2ZafZ",
    "XahmMB0GA1UdDgQWBBRYAYQkG7wrUpRKPaUQchRR9a86yTAOBgNVHQ8BAf8EBAMC",
    "AQYwFwYDVR0gBBAwDjAMBgpghkgBZQMCATABMA8GA1UdEwEB/wQFMAMBAf8wDQYJ",
    "KoZIhvcNAQELBQADggEBADWHlxbmdTXNwBL/llwhQqwnazK7CC2WsXBBqgNPWj7m",
    "tvQ+aLG8/50Qc2Sun7o2VnwF9D18UUe8Gj3uPUYH+oSI1vDdyKcjmMbKRU4rk0eo",
    "3UHNDXwqIVc9CQS9smyV+x1HCwL4TTrq+LXLKx/qVij0Yqk+UJfAtrg2jnYKXsCu",
    "FMBQQnWCGrwa1g1TphRp/RmYHnMynYFmZrXtzFz+U9XEA7C+gPq4kqDI/iVfIT1s",
    "6lBtdB50lrDVwl2oYfAvW/6sC2se2QleZidUmrziVNP4oEeXINokU6T6p//HM1FG",
    "QYw2jOvpKcKtWCSAnegEbgsGYzATKjmPJPJ0npHFqzP=",
  ].join("");

  const pemCa1 = [
    "MIIDlzCCAn+gAwIBAgIBCzANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJVUzEg",
    "MB4GA1UEChMXVGVzdCAgQ2VydGlmaWNhdGVzIDIwMTExFDASBgNVBAMTC0dvb2Qg",
    "ICAgIENBMB4XDTEwMDEwMTA4MzAwMFoXDTMwMTIzMTA4MzAwMFowbDELMAkGA1UE",
    "BhMCVVMxHzAdBgNVBAoTFlRlc3QgQ2VydGlmaWNhdGVzIDIwMTExPDA6BgNVBAMT",
    "M1ZhbGlkIE5hbWUgQ2hhaW5pbmcgV2hpdGVzcGFjZSBFRSBDZXJ0aWZpY2F0ZSBU",
    "ZXN0MzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALHDyEmorSlP274u",
    "/18BUHzKkc9SIwgCP7PBHTOfjf6Zy5H5WVZ0iPjotyQpm8nhiZLodmJ7I14LyQaV",
    "gCQaZJR3gw5dKMYHotPXQcI4jptWTiiG+aNT7bZREbg5BA7jTswTLokWbcQHBSx6",
    "iN6QfHS1LJP0ah4ccVVpi3sqDvfzhzWsU9s/S2pFUOHM6/iHc6H9Zy/CxceTHrt9",
    "jw5A3KHRZ9ihMGuwZXZfZn7HHtDuVMUb23QRhBVoPo+QzCCGXb3Kxr1/qM1EiFgW",
    "mkieRIPGygUkFoGyH+ELQNclyI1bb9jsW4g+vr6PTYgEJofktbQB3WwCRH7ADIW6",
    "6fpSr/UCAwEAAaNrMGkwHwYDVR0jBBgwFoAUWAGEJBu8K1KUSj2lEHIUUfWvOskw",
    "HQYDVR0OBBYEFM+4igHs3RwMuk/hDgGZXsfaFTxTMA4GA1UdDwEB/wQEAwIE8DAX",
    "BgNVHSAEEDAOMAwGCmCGSAFlAwIBMAEwDQYJKoZIhvcNAQELBQADggEBAD5C0FF8",
    "5YCkCu/hOuIAlLhMSkjdlBKlpnFriNjiKtNNPm+lEXUCnN9Iug/QrqevX1wTN7zx",
    "glDipUTax7bo3/z4eT/eURz5shg4swHdnDofLxRDJybSEG0hEDUgu+lvww13FHFQ",
    "6ZgGvgC4O5wPE1UVCQmM2EcVkcdn6sMLozzH+sg40gj/VALvh2H6VhobkV7dzI82",
    "cGPZhPDNjO/w4MjGTfhQjPvMGVuLjazBZxNCyfZeYDjygmIDSDLmFAdum34Vk8OL",
    "/lGLKLp31rM7EBYhkpu48PhPy8iUXAvR+qPlcKfbQ+k/D8rbzDE3tX/Iw/6LdhU5",
    "3xt3vd6uvytI5db=",
  ].join("");

  const pemRoot = [
    "MIIDRzCCAi+gAwIBAgIBATANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJVUzEf",
    "MB0GA1UEChMWVGVzdCBDZXJ0aWZpY2F0ZXMgMjAxMTEVMBMGA1UEAxMMVHJ1c3Qg",
    "QW5jaG9yMB4XDTEwMDEwMTA4MzAwMFoXDTMwMTIzMTA4MzAwMFowRTELMAkGA1UE",
    "BhMCVVMxHzAdBgNVBAoTFlRlc3QgQ2VydGlmaWNhdGVzIDIwMTExFTATBgNVBAMT",
    "DFRydXN0IEFuY2hvcjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALmZ",
    "UYkRR+DNRbmEJ4ITAhbNRDmqrNsJw97iLE7bpFeflDUoNcJrZPZbC208bG+g5M0A",
    "TzV0vOqg88Ds1/FjFDK1oPItqsiDImJIq0xb/et5w72WNPxHVrcsr7Ap6DHfdwLp",
    "NMncqtzX92hU/iGVHLE/w/OCWwAIIbTHaxdrGMUG7DkJJ6iI7mzqpcyPvyAAo9O3",
    "SHjJr+uw5vSrHRretnV2un0bohvGslN64MY/UIiRnPFwd2gD76byDzoM1ioyLRCl",
    "lfBJ5sRDz9xrUHNigTAUdlblb6yrnNtNJmkrROYvkh6sLETUh9EYh0Ar+94fZVXf",
    "GVi57Sw7x1jyANTlA40CAwEAAaNCMEAwHQYDVR0OBBYEFOR9X9FclYYILAWuvnW2",
    "ZafZXahmMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3",
    "DQEBCwUAA4IBAQCYoa9uR55KJTkpwyPihIgXHq7/Z8dx3qZlCJQwE5qQBZXIsf5e",
    "C8Va/QjnTHOC4Gt4MwpnqqmoDqyqSW8pBVQgAUFAXqO91nLCQb4+/yfjiiNjzprp",
    "xQlcqIZYjJSVtckH1IDWFLFeuGW+OgPPEFgN4hjU5YFIsE2r1i4+ixkeuorxxsK1",
    "D/jYbVwQMXLqn1pjJttOPJwuA8+ho1f2c8FrKlqjHgOwxuHhsiGN6MKgs1baalpR",
    "/lnNFCIpq+/+3cnhufDjvxMy5lg+cwgMCiGzCxn4n4dBMw41C+4KhNF7ZtKuKSZ1",
    "eczztXD9NUkGUGw3LzpLDJazz3JhlZ/9pXzF",
  ].join("");

  const pemCrl1 = [
    "MIIB4zCBzAIBATANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJVUzEfMB0GA1UE",
    "ChMWVGVzdCBDZXJ0aWZpY2F0ZXMgMjAxMTEVMBMGA1UEAxMMVHJ1c3QgQW5jaG9y",
    "Fw0xMDAxMDEwODMwMDBaFw0zMDEyMzEwODMwMDBaMCIwIAIBaBcNMTAwMTAxMDgz",
    "MDAwWjAMMAoGA1UdFQQDCgEBoC8wLTAfBgNVHSMEGDAWgBTkfV/RXJWGCCwFrr51",
    "tmWn2V2oZjAKBgNVHRQEAwIBATANBgkqhkiG9w0BAQsFAAOCAQEAqxkdtbsha7bh",
    "TM3wtzeelTjR1IGQgK4R8Psc2fw2NOydlq8PeSc3qitHV6m4dqHzchQlytYprOK4",
    "dRitEh+RYY4UKUNu+OQQ5VFLSvuC0Wv3xn2w29VqpQtavBFfJ8Lst9520pece6x8",
    "6fB9L6VP4YNGIrLc+7hEjEDALJs+ttPoxNNXGMApQQi5xyZEksXQAo60ZdH/r95l",
    "dVCa7U2OVXO1MCuZlWQRlql0Bi3CzE26cW1jccEdU6yQ0ONKNuROR+6NsXZ2Qm2C",
    "lHEGWFJAZ/CWB7NjQ9maNkoioZb4IB2AKPKBcb0mT3TYspgT8zcZSP5DLC8iVOrc",
    "x2SLSvd35s==",
  ].join("");

  const pemCrl2 = [
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
  ].join("");

  // Read certificates from PEM
  const leaf = pkijs.Certificate.fromBER(Buffer.from(pemLeaf, "base64"));
  const ca = pkijs.Certificate.fromBER(Buffer.from(pemCa1, "base64"));
  const root = pkijs.Certificate.fromBER(Buffer.from(pemRoot, "base64"));

  // Read CRLs from PEM
  const crl1 = pkijs.CertificateRevocationList.fromBER(Buffer.from(pemCrl1, "base64"));
  const crl2 = pkijs.CertificateRevocationList.fromBER(Buffer.from(pemCrl2, "base64"));

  // Build certificate chain
  const chain = new pkijs.CertificateChainValidationEngine({
    checkDate: new Date("2020-01-01"),
    certs: [leaf, ca],
    trustedCerts: [root],
    crls: [crl1, crl2]
  });
  const res = await chain.verify();

  // Output the chain result
  console.log([res]);
  // {
  //   result: true,
  //   resultCode: 0,
  //   resultMessage: '',
  //   authConstrPolicies: [ '2.16.840.1.101.3.2.1.48.1' ],
  //   userConstrPolicies: [ '2.5.29.32.0' ],
  //   explicitPolicyIndicator: false,
  //   policyMappings: [ <2 empty items> ],
  //   certificatePath: [ [Certificate], [Certificate], [Certificate] ]
  // }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
