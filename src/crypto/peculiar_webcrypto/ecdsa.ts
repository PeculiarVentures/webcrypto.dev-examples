import { Crypto } from "@peculiar/webcrypto";

async function main() {
  // Initialize the crypto engine
  const crypto = new Crypto();

  const alg = {
    name: "ECDSA",
    hash: "SHA-256",
    namedCurve: "P-256"
  };

  // Generate a key pair using ECDSA mechanism
  const keys = await crypto.subtle.generateKey(alg, false, ["sign", "verify"]);

  // Export the public key
  const spki = await crypto.subtle.exportKey("spki", keys.publicKey);
  console.log(spki); // ArrayBuffer with DER encoded public key

  // Sign the data
  const data = crypto.getRandomValues(new Uint8Array(1024));
  const signature = await crypto.subtle.sign(alg, keys.privateKey, data);
  console.log(signature);

  // Verify the signature
  const ok = await crypto.subtle.verify(alg, keys.publicKey, signature, data);
  console.log("Signature:", ok); // Signature: true
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
