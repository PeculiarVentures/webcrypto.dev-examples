import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";

const crypto = new Crypto();

async function main() {
  const pem = [
    "-----BEGIN CMS-----",
    "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",
    "4GQMMQA=",
    "-----END CMS-----",
  ].join("\n");

  // Create a set of certificates from the PEM encoded CMS
  const certs = new x509.X509Certificates(pem);

  // Build a certificate chain from a set of certificates
  const chainBuilder = new x509.X509ChainBuilder({
    certificates: certs,
  });
  const chain = await chainBuilder.build(certs[0], crypto);

  // Output the X509 chain
  console.log([[chain]]); // X509Certificates(4) [X509Certificate, X509Certificate, X509Certificate, X509Certificate]

  // Output the X509 chain in PEM format
  console.log(chain.toString("pem-chain"));
  // -----BEGIN CERTIFICATE-----
  // MIICzzCCAbegAwIBAgIBATANBgkqhkiG9w0BAQsFADAfMR0wGwYDVQQDExRJbnRl
  // cm1lZGlhdGUgQ0EgIzIuMTAeFw0xOTEyMzEyMzAwMDBaFw0yMDAxMDEyMzAwMDBa
  // ...
  // PLlTfVJ5g27vhlHZBhuYdEzjY1+QNBHScNvezz854cN0GkJLt/66tJFJjJ3zwKKs
  // iyko
  // -----END CERTIFICATE-----
  // -----BEGIN CERTIFICATE-----
  // MIIC2DCCAcCgAwIBAgIBATANBgkqhkiG9w0BAQsFADAdMRswGQYDVQQDExJJbnRl
  // cm1lZGlhdGUgQ0EgIzIwHhcNMTkxMjMxMjMwMDAwWhcNMjAwMTAxMjMwMDAwWjAf
  // ...
  // dX5Cfe4Ko+tPz0mijJNqpwVLz/uCt7E+Vt3hwc2zrVFAa2EOxz7GBROvhwV8KFxn
  // jrppyU20gb1yOp+J
  // -----END CERTIFICATE-----
  // -----BEGIN CERTIFICATE-----
  // MIICyzCCAbOgAwIBAgIBATANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDEwdSb290
  // IENBMB4XDTE5MTIzMTIzMDAwMFoXDTIwMDEwMTIzMDAwMFowHTEbMBkGA1UEAxMS
  // ...
  // pcdT+JbCGrQ0Gyt4ehsrqNBQXMgGhg75atIt7JVNIpR7FCpegiXOggjMdLjjWRtS
  // IRykrEVZ1i6MRbcdJKjMyalESLBh325JuLzknkgsmMAzPBuphRJaPnhWcagj2/s=
  // -----END CERTIFICATE-----
  // -----BEGIN CERTIFICATE-----
  // MIICwDCCAaigAwIBAgIBATANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDEwdSb290
  // IENBMB4XDTE5MTIzMTIzMDAwMFoXDTIwMDEwMTIzMDAwMFowEjEQMA4GA1UEAxMH
  // ...
  // wrp/7QbTcxRHe8ur7ThPY4bzoHPq28WkQQX5TAFREijMuEXJxMcVj2L0qWMQfU3I
  // XMOOc9nSmX1/jMJXg3Q33o6f79rWiyFFIVqUagVPONzV4GQM
  // -----END CERTIFICATE-----
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
