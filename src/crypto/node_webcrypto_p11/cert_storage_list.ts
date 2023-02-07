import { Crypto, X509Certificate } from "node-webcrypto-p11";

async function main() {
  // Initialize the crypto engine
  const crypto = new Crypto({
    library: "/usr/local/lib/softhsm/libsofthsm2.so",
    name: "SoftHSM",
    slot: 0,
    pin: "12345",
  });

  // Print all certificates on the token with private key
  const keyIndexes = await crypto.certStorage.keys();
  const certIndexes = await crypto.certStorage.keys();
  for (const certIndex of certIndexes) {
    const cert = await crypto.certStorage.getItem(certIndex);
    if (!(cert instanceof X509Certificate)) {
      // skip all items except X509Certificate
      continue;
    }

    const certId = certIndex.split("-")[2]; // <type>-<handle>-<id>
    if (!keyIndexes.some(o => o.endsWith(certId))) {
      // skip certificate without the private key
      continue;
    }

    console.log("Subject:", cert.subjectName); // Subject: CN=Test certificate
  }

  crypto.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
