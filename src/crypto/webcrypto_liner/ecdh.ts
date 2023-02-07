import "./mock_browser";

async function main() {
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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
