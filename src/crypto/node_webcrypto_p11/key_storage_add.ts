import { Crypto, X509Certificate } from "node-webcrypto-p11";

async function main() {
  // Initialize the crypto engine
  const crypto = new Crypto({
    library: "/usr/local/lib/softhsm/libsofthsm2.so",
    name: "SoftHSM",
    slot: 0,
    pin: "12345",
    readWrite: true,
  });

  // Generate the RSA key
  const alg = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    publicExponent: new Uint8Array([1, 0, 1]),
    modulusLength: 2048,
  };
  const keys = await crypto.subtle.generateKey(alg, false, ["sign", "verify"]);

  // Add the private key to the token
  await crypto.keyStorage.setItem(keys.privateKey);

  crypto.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
