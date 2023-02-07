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
    name: "ECDH",
    namedCurve: "P-256"
  };
  const secretAlg = {
    name: "AES-CBC",
    length: 256,
  };

  // Generate a key pair using ECDH mechanism
  const keys = await crypto.subtle.generateKey(alg, false, ["deriveKey"]);

  // Derive the secret key
  const dhAlg = {
    ...alg,
    public: keys.publicKey,
  };
  const secret = await crypto.subtle.deriveKey(dhAlg, keys.privateKey, secretAlg, false, ["encrypt", "decrypt"]);
  console.log(secret); // CryptoKey

  crypto.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
