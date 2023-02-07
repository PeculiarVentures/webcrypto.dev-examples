import { Crypto } from "@peculiar/webcrypto";

async function main() {
  // Initialize the crypto engine
  const crypto = new Crypto();

  const alg = {
    name: "AES-CBC",
    length: 256,
  };

  // Generate a secret key using AES mechanism
  const secret = await crypto.subtle.generateKey(alg, true, ["encrypt", "decrypt"]);

  // Export the secret key
  const raw = await crypto.subtle.exportKey("raw", secret);
  console.log(raw); // ArrayBuffer

  // Encrypt the data
  const data = crypto.getRandomValues(new Uint8Array(1024));
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const cipherAlg = {
    name: "AES-CBC",
    iv,
  };
  const encryptedData = await crypto.subtle.encrypt(cipherAlg, secret, data);
  console.log(encryptedData); // ArrayBuffer

  // Decrypt the encrypted data
  const decryptedData = await crypto.subtle.decrypt(cipherAlg, secret, encryptedData);
  console.log(decryptedData); // CryptoKey
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
