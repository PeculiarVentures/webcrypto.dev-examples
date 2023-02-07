import { Crypto } from "node-webcrypto-p11";

async function main() {
  // Initialize the crypto engine
  const crypto = new Crypto({
    library: "/usr/local/lib/softhsm/libsofthsm2.so",
    name: "SoftHSM",
    slot: 0,
    pin: "12345",
  });

  const alg = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    publicExponent: new Uint8Array([1, 0, 1]),
    modulusLength: 2048,
  };

  // Generate a key pair using RSA 2048 mechanism
  const keys = await crypto.subtle.generateKey(alg, false, ["sign", "verify"]);

  // Export the public key
  const spki = await crypto.subtle.exportKey("spki", keys.publicKey);
  console.log(spki); // ArrayBuffer with DER encoded public key

  // Sign the data
  const data = new Uint8Array(1024);
  const signature = await crypto.subtle.sign(alg, keys.privateKey, data);
  console.log(signature);

  // Verify the signature
  const ok = await crypto.subtle.verify(alg, keys.publicKey, signature, data);
  console.log("Signature:", ok); // Signature: true

  crypto.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
