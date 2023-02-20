import * as assert from "node:assert";
import * as acme from "@peculiar/acme-client";
import { Crypto } from "@peculiar/webcrypto";
import * as x509 from "@peculiar/x509";

const letsEncryptStagingUrl = "https://acme-staging-v02.api.letsencrypt.org/directory";

async function main() {
  const crypto = new Crypto();

  // Generates ECDSA key pair
  const algorithm = {
    name: "ECDSA",
    namedCurve: "P-256",
    hash: "SHA-256",
  };
  const keys = await crypto.subtle.generateKey(algorithm, false, ["sign", "verify"]);

  // Initialize an ACME client
  const client = await acme.ApiClient.create(keys, letsEncryptStagingUrl, {
    crypto,
  });

  // Register a new ACME account 
  const account = await client.newAccount({
    contact: ["mailto:some@email.net"],
    termsOfServiceAgreed: true,
  });

  // Create a new order
  let order = await client.newOrder({
    identifiers: [
      { type: "dns", value: "some.domain.com" },
    ],
  });

  for (const link of order.content.authorizations) {
    let authz = await client.getAuthorization(link);

    if (authz.content.status === "pending") {
      const httpChallenge = authz.content.challenges.find(o => o.type === "http-01");
      assert(httpChallenge, `Cannot find http-01 challenge for '${authz.content.identifier.type}:${authz.content.identifier.value}' authorization`);

      console.log(httpChallenge);
      // Get Token and put it to wellknown link of the Server
      // <write your code here>

      // Validate challenge
      const resp = await client.getChallenge(httpChallenge.url, {});

      // Get 'up' link for the authz status validation
      const upLink = resp.headers.link?.find(o => o.includes(`"up"`));
      assert.ok(upLink, "Cannot get required parameter 'up' from the 'Link' header fo the response.");
      const upUrl = /<([^<>]+)>/.exec(upLink)?.[1];
      assert.ok(upUrl, "Cannot get up link from header");

      // Waiting for challenge validation
      authz = await client.retryAuthorization(upUrl, {
        interval: 1000,
        retries: 5,
      });
      assert.strictEqual(authz.content.status, "valid");
    }
  }

  // Generate CSR
  const reqKeys = await crypto.subtle.generateKey(algorithm, false, ["sign", "verify"]) as CryptoKeyPair;
  const req = await x509.Pkcs10CertificateRequestGenerator.create({
    keys: reqKeys,
    name: "DC=some.domain.com",
    signingAlgorithm: algorithm,
  }, crypto);

  // Request certificate
  await client.finalize(order.content.finalize, {
    csr: req.toString("base64url"),
  });

  // Waiting for enrollment
  order = await client.retryOrder(order);
  assert.strictEqual(order.content.status, "valid", `Incorrect status of the ACME Order.`);
  assert.ok(order.content.certificate, "The ACME Order doesn't have required link for enrolled certificate.");

  // Get issued certificate
  const certs = await client.getCertificate(order.content.certificate);
  console.log(certs.content); // List of DER encoded certificates. The enrolled certificate must be the first element in the list.
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
