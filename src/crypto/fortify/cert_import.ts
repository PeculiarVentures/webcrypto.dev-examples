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

  // PEM representation of the Certificate
  const pem = [
    "-----BEGIN CERTIFICATE-----",
    "MIIDIDCCAgigAwIBAgIBATANBgkqhkiG9w0BAQsFADA3MRkwFwYDVQQDExBUZXN0",
    "IGNlcnRpZmljYXRlMQ0wCwYDVQQKEwRUZXN0MQswCQYDVQQHEwJVUzAeFw0yMzAy",
    "MTMwMDAwMDBaFw0yNDAyMTMwMDAwMDBaMDcxGTAXBgNVBAMTEFRlc3QgY2VydGlm",
    "aWNhdGUxDTALBgNVBAoTBFRlc3QxCzAJBgNVBAcTAlVTMIIBIjANBgkqhkiG9w0B",
    "AQEFAAOCAQ8AMIIBCgKCAQEAhe8ncyqNwGTNUGeTEMxcrJiwBVBCHTj10E7jqm10",
    "g5Wo/E7DPMjk6Gyli1XL4ALWqDZrn0Iz1oq8bk5ULYsEB3FlWy+NXIY2ilF+Bz+T",
    "p12uQmDXlQaU4c6Nm9uNXnCn0FM9cj+9pcQDlxmJkx/3BiHo8+U+aCHuSWBFDjN+",
    "+1B95UQSrNVHmzg+WyjccvptsAPvATY7bjPZCyo3zXZgl41rLghEzaQ7pstbl2Vb",
    "Scy1R2hdmrtKyd42bF3RCqQ9DuO/YgOMd2mgdEbDDH80khn9HXxRx9nOMWf2bR44",
    "tDfqHYda9UcSq8JNOb9msKPskwI9CX3vJq4doUQn4/3ZuwIDAQABozcwNTAOBgNV",
    "HQ8BAf8EBAMCBsAwDwYDVR0TAQH/BAUwAwIBADASBgNVHSAECzAJMAcGBSoDBAUG",
    "MA0GCSqGSIb3DQEBCwUAA4IBAQAXkqSAUNu+lRnUHAVcw4QMQ9GwUfZIFD403BVC",
    "WCi75/RFNYY+RF3PD0ypFJ61bHvcpJ8j/CDk7hokLWQhEZ2kd6FKtAqGOX+fEnLD",
    "SJdw1pLVZx7bBwnDxlvaCnn2wlcqTI5kwyONGWHU681Wfz72zJHMsGYW7GmQCOmb",
    "M7UHrVkGxQueYi4MqxfAumR0oh+FMvTqc74IrOn68EguWGanLMqQZsgZeQKAfukJ",
    "8pXY3a08hHKgvk+7NCogqBtiFUYVJ8R6EZ7VDDI4FtV7IwtlzhKiuShWp+wmuae5",
    "dTlg6DIG2NY1ecIoxnpPDwZcfvQY9NGrjhKvK96IFhx2FGn0",
    "-----END CERTIFICATE-----",
  ].join("\n");

  // Create new Certificate instance from the PEM encoded data
  const cert = new x509.X509Certificate(pem);

  // Import the certificate and set it into the token
  const tokenCert = await crypto.certStorage.importCert("raw", cert.rawData, cert.signatureAlgorithm, ["verify"]);
  await crypto.certStorage.setItem(tokenCert);

  // Close the connection
  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
