import { Crypto } from "node-webcrypto-p11";

async function main() {
  // Initialize the crypto engine
  const crypto = new Crypto({
    library: "/usr/local/lib/softhsm/libsofthsm2.so",
    name: "SoftHSM",
    slot: 0,
    pin: "12345",
  });

  const data = crypto.getRandomValues(new Uint8Array(1024));

  // Compute SHA-1 digest
  const sha1 = await crypto.subtle.digest("SHA-1", data);
  console.log(sha1); // ArrayBuffer

  // Compute SHA-256 digest
  const sha256 = await crypto.subtle.digest("SHA-256", data);
  console.log(sha256); // ArrayBuffer

  // Compute SHA-384 digest
  const sha384 = await crypto.subtle.digest("SHA-384", data);
  console.log(sha384); // ArrayBuffer

  // Compute SHA-512 digest
  const sha512 = await crypto.subtle.digest("SHA-512", data);
  console.log(sha512); // ArrayBuffer

  crypto.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
