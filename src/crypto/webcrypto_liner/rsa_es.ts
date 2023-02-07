import "./mock_browser";

async function main() {
  //! NOTE: This crypto mechanism is a non-standard WebCrypto mechanism

  const alg = {
    name: "RSAES-PKCS1-v1_5",
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
  if (!("privateKey" in keys)) {
    throw new Error("Incorrect type of keys. It must be CryptoKeyPair.");
  }

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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
