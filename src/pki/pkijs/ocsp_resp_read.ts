import { Crypto } from "@peculiar/webcrypto";
import * as pkijs from "pkijs";

enum OCSPStatus {
  good,
  revoked,
  unknown,
}

async function main() {
  // Set crypto engine for PKIjs module
  const crypto = new Crypto();
  pkijs.setEngine("NodeJS", new pkijs.CryptoEngine({ crypto }));

  const pemResp = [
    "MIICMgoBAKCCAiswggInBgkrBgEFBQcwAQEEggIYMIICFDBmoSAwHjEcMAkGA1UE",
    "BhMCUlUwDwYDVQQDHggAVABlAHMAdBgTMjAyMzAyMTQyMzE4MDkuMTg0WjAtMCsw",
    "EjAHBgUrDgMCGgQBAQQBAQIBAYAAGBMyMDIzMDIxNDIzMTgwOS4xODRaMAoGCCqG",
    "SM49BAMCA0kAMEYCIQCAV6uvlHFiAtkGdy1Rjm/nzxYp3eTIXf0jBYuMHCYM5AIh",
    "AJ0BqVt7VD9t5wfmt8innJcdzboOPlhE6FzdI+JwdYkxoIIBUTCCAU0wggFJMIHx",
    "oAMCAQICAQEwCgYIKoZIzj0EAwIwHjEcMAkGA1UEBhMCUlUwDwYDVQQDHggAVABl",
    "AHMAdDAeFw0yMzAyMTQyMzE4MDlaFw0yNDAyMTQyMzE4MDlaMB4xHDAJBgNVBAYT",
    "AlJVMA8GA1UEAx4IAFQAZQBzAHQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQu",
    "lHr8ih624EEfd4NqNm26aDYx5ienKzyaXqjJln+Wxl6aptqRxeAx3xqzhzSHAknr",
    "inpnlgwfZ0guFlUH3ZvMoyAwHjAPBgNVHRMECDAGAQH/AgEDMAsGA1UdDwQEAwIA",
    "BjAKBggqhkjOPQQDAgNHADBEAiBqJryDymRUh2/7XajS8OdL45M3Htz5G8raQkSj",
    "FVslCAIgCz5c7kCvceQfxN9woWikQYlHNJXnpzj0N2SdIylZzyE=",
  ].join("");
  const pemLeaf = [
    "MIIBSTCB8aADAgECAgEBMAoGCCqGSM49BAMCMB4xHDAJBgNVBAYTAlJVMA8GA1UE",
    "Ax4IAFQAZQBzAHQwHhcNMjMwMjE0MjMxODA5WhcNMjQwMjE0MjMxODA5WjAeMRww",
    "CQYDVQQGEwJSVTAPBgNVBAMeCABUAGUAcwB0MFkwEwYHKoZIzj0CAQYIKoZIzj0D",
    "AQcDQgAELpR6/IoetuBBH3eDajZtumg2MeYnpys8ml6oyZZ/lsZemqbakcXgMd8a",
    "s4c0hwJJ64p6Z5YMH2dILhZVB92bzKMgMB4wDwYDVR0TBAgwBgEB/wIBAzALBgNV",
    "HQ8EBAMCAAYwCgYIKoZIzj0EAwIDRwAwRAIgaia8g8pkVIdv+12o0vDnS+OTNx7c",
    "+RvK2kJEoxVbJQgCIAs+XO5Ar3HkH8TfcKFopEGJRzSV56c49DdknSMpWc8h",
  ].join("");
  const pemCA = [
    "MIIBSTCB8aADAgECAgEBMAoGCCqGSM49BAMCMB4xHDAJBgNVBAYTAlJVMA8GA1UE",
    "Ax4IAFQAZQBzAHQwHhcNMjMwMjE0MjMxODA5WhcNMjQwMjE0MjMxODA5WjAeMRww",
    "CQYDVQQGEwJSVTAPBgNVBAMeCABUAGUAcwB0MFkwEwYHKoZIzj0CAQYIKoZIzj0D",
    "AQcDQgAELpR6/IoetuBBH3eDajZtumg2MeYnpys8ml6oyZZ/lsZemqbakcXgMd8a",
    "s4c0hwJJ64p6Z5YMH2dILhZVB92bzKMgMB4wDwYDVR0TBAgwBgEB/wIBAzALBgNV",
    "HQ8EBAMCAAYwCgYIKoZIzj0EAwIDRwAwRAIgaia8g8pkVIdv+12o0vDnS+OTNx7c",
    "+RvK2kJEoxVbJQgCIAs+XO5Ar3HkH8TfcKFopEGJRzSV56c49DdknSMpWc8h",
  ].join("");

  // Read certificates
  const leaf = pkijs.Certificate.fromBER(Buffer.from(pemLeaf, "base64"));
  const ca = pkijs.Certificate.fromBER(Buffer.from(pemCA, "base64"));

  // Read OCSP response
  const ocspResp = pkijs.OCSPResponse.fromBER(Buffer.from(pemResp, "base64"));
  const certStatus = await ocspResp.getCertificateStatus(leaf, ca);
  console.log("OCSP status:", OCSPStatus[certStatus.status]); // OCSP status: good
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
