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

  // Output the information about all certificates on the token
  console.log("Certificates:");
  const certIds = await crypto.certStorage.keys();
  for (const certId of certIds) {
    const [type, handle, id] = certId.split("-");
    if (type !== "x509") {
      continue;
    }

    // Get the certificate raw data and read them using X509Certificate class
    const certRaw = await crypto.certStorage.getValue(certId);
    if (!certRaw) {
      continue;
    }
    const cert = new x509.X509Certificate(certRaw);

    // Looks for the certificate private key
    const privateKey = await crypto.certStorage.findPrivateKey(certId);

    // Output the certificate information
    console.log("  Certificate:");
    console.log(`    ID:              ${certId}`);
    console.log(`    Serial number:   ${cert.serialNumber}`);
    console.log(`    Subject:         ${cert.subject}`);
    console.log(`    Public key:      ${cert.publicKey.algorithm.name}`);
    console.log(`    Not after:       ${cert.notAfter.toDateString()}`);
    console.log(`    Has private key: ${!!privateKey}`);
  }
  // Certificates:
  //   Certificate:
  //     ID:              x509-1100000000000000-8112d7796d9055920aa568b3abd25489
  //     Serial number:   01
  //     Subject:         CN=Test certificate, O=Test, C=US
  //     Public key:      RSASSA-PKCS1-v1_5
  //     Not after:       Tue Feb 13 2024
  //     Has private key: true
  //   Certificate:
  //     ID:              x509-1400000000000000-7c48be509bf6455ffe0dbd363ed563a9
  //     Serial number:   01
  //     Subject:         CN=Test certificate #2, O=Test, L=US
  //     Public key:      RSASSA-PKCS1-v1_5
  //     Not after:       Tue Feb 13 2024
  //     Has private key: false

  // Close the connection
  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
