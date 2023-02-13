import { setEngine } from "2key-ratchet";
import * as process from "node:process";
import { MemoryStorage, SocketProvider } from "@webcrypto-local/client";
import * as x509 from "@peculiar/x509";
import { Crypto } from "@peculiar/webcrypto";

// disable TLS certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Set crypto engine for 2key-ratchet
setEngine("NodeJS", new Crypto());

async function main() {
  // Initialize a Fortify client
  const client = new SocketProvider({
    storage: new MemoryStorage(),
  });

  // Connect the client with the Fortify application
  await new Promise<void>((resolve, reject) => {
    client.connect(SocketProvider.FORTIFY)
      .on("listening", resolve)
      .on("error", reject);
  });

  const authorized = await client.isLoggedIn();
  if (!authorized) {
    // Output the challenge password to the user for authentication
    const challenge = await client.challenge();
    console.log("Challenge:", challenge);

    // Authenticate the session
    await client.login();
  }

  const info = await client.info();

  // Get Crypto for the selected provider
  const provider = info.providers[0];
  if (!provider) {
    throw new Error("Cannot get provider");
  }
  const crypto = await client.getCrypto(provider.id);

  // Authenticate a user to the cryptographic token (e.g. a smart card or hardware security module)
  const cryptoLoggedIn = await crypto.isLoggedIn();
  if (!cryptoLoggedIn) {
    await crypto.login();
  }

  const knownId = "8112d7796d9055920aa568b3abd25489";

  const certIds = await crypto.certStorage.keys();
  const certId = certIds.find(o => o.startsWith("x509-") && o.endsWith(`-${knownId}`));
  if (!certId) {
    throw new Error(`Unable to retrieve certificate with specified id:${knownId}`);
  }

  const certRaw = await crypto.certStorage.getValue(certId);
  if (!certRaw) {
    throw new Error(`Unable to retrieve raw data for the certificate with the specified id:${knownId}`);
  }
  const cert = new x509.X509Certificate(certRaw);

  // Looks for the certificate private key
  const privateKey = await crypto.certStorage.findPrivateKey(certId);
  if (!privateKey) {
    throw new Error("Private key not found for the Certificate");
  }

  // Output the certificate information
  console.log("Certificate:");
  console.log(`  ID:              ${certId}`);                        // ID:              x509-1100000000000000-8112d7796d9055920aa568b3abd25489
  console.log(`  Serial number:   ${cert.serialNumber}`);             // Serial number:   01
  console.log(`  Subject:         ${cert.subject}`);                  // Subject:         CN=Test certificate, O=Test, C=US
  console.log(`  Public key:      ${cert.publicKey.algorithm.name}`); // Public key:      RSASSA-PKCS1-v1_5 
  console.log(`  Not after:       ${cert.notAfter.toDateString()}`);  // Not after:       Tue Feb 13 2024

  // Sign data
  const data = new ArrayBuffer(2048);
  const signature = await crypto.subtle.sign(cert.signatureAlgorithm, privateKey, data);

  // Verify the signed data
  const publicKey = await cert.publicKey.export(crypto);
  const ok = await crypto.subtle.verify(cert.signatureAlgorithm, publicKey, signature, data);
  console.log("Signature:", ok); // Signature: true

  // Close the connection
  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
