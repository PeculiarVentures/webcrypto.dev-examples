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

  // List crypto providers
  console.log("Providers:");
  for (const provInfo of info.providers) {
    console.log(`  ${provInfo.name}`);
  }
  // Providers:
  //   MacOS Crypto
  //   NSS default-release profile
  //   My slot 0

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

  // Generate an ECDSA key
  const algorithm = {
    name: "ECDSA",
    hash: "SHA-256",
    namedCurve: "P-256",
  };
  const keys = await crypto.subtle.generateKey(algorithm, false, ["sign", "verify"]);

  // Create a PKCS10 certificate request
  const certReq = await x509.Pkcs10CertificateRequestGenerator.create({
    name: "CN=Test certificate, O=Test, L=US",
    keys,
    signingAlgorithm: algorithm,
    extensions: [
      new x509.SubjectAlternativeNameExtension([
        { type: "dns", value: "some.domain.com" },
      ]),
    ],
  }, crypto);

  // Output the PKCS10 certificate request in PEM format
  console.log(certReq.toString("pem"));

  // Save the generated keys into the token
  await crypto.keyStorage.setItem(keys.privateKey);
  await crypto.keyStorage.setItem(keys.publicKey);

  // Close the connection
  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
