import { Crypto, X509Certificate } from "node-webcrypto-p11";

async function main() {
  // Initialize the crypto engine
  const crypto = new Crypto({
    library: "/usr/local/lib/softhsm/libsofthsm2.so",
    name: "SoftHSM",
    slot: 0,
    pin: "12345",
  });

  // Print all keys on the token
  const indexes = await crypto.keyStorage.keys();
  for (const index of indexes) {
    const cert = await crypto.keyStorage.getItem(index);
    console.log(cert); // CryptoKey
  }

  crypto.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
