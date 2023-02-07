import { Crypto } from "@peculiar/webcrypto";

async function main() {
  //! NOTE: This crypto mechanism is a non-standard WebCrypto mechanism

  // Initialize the crypto engine
  const crypto = new Crypto();

  const alg = {
    name: "ECDH-ES",
    namedCurve: "X25519", // X25519 or X448
  };
  const secretAlg = {
    name: "AES-CBC",
    length: 256,
  };

  // Generate a key pair using ECDH-ES mechanism
  const keys = await crypto.subtle.generateKey(alg, false, ["deriveKey"]);

  // Derive the secret key
  const dhAlg = {
    ...alg,
    public: keys.publicKey,
  };
  const secret = await crypto.subtle.deriveKey(dhAlg, keys.privateKey, secretAlg, false, ["encrypt", "decrypt"]);
  console.log(secret); // CryptoKey
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
