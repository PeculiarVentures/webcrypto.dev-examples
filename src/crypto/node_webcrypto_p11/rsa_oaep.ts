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
    name: "RSA-OAEP",
    hash: "SHA-1",
    publicExponent: new Uint8Array([1, 0, 1]),
    modulusLength: 2048,
  };
  const secretAlg = {
    name: "AES-CBC",
    length: 256,
  };

  // Generate a secret key using AES mechanism
  const secret = await crypto.subtle.generateKey(secretAlg, true, ["encrypt", "decrypt"]);

  // Generate a key pair using RSA 2048 mechanism
  const keys = await crypto.subtle.generateKey(alg, false, ["wrapKey", "unwrapKey"]);

  // Export the public key
  const spki = await crypto.subtle.exportKey("spki", keys.publicKey);
  console.log(spki); // ArrayBuffer with DER encoded public key

  // Wrap the secret key
  const data = crypto.getRandomValues(new Uint8Array(16)); // secret key
  const wrappedKey = await crypto.subtle.wrapKey("raw", secret, keys.publicKey, alg);
  console.log(wrappedKey); // ArrayBuffer

  // Verify the signature
  const unwrappedKey = await crypto.subtle.unwrapKey("raw", wrappedKey, keys.privateKey, alg, secretAlg, false, ["encrypt", "decrypt"]);
  console.log(unwrappedKey); // CryptoKey

  crypto.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
