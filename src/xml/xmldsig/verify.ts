import * as assert from "node:assert";
import { Crypto } from "@peculiar/webcrypto";
import * as xmldsig from "xmldsigjs";

async function main() {
  // Set crypto engine for XML module
  const crypto = new Crypto();
  xmldsig.Application.setEngine("NodeJS", crypto);

  const xmlSigned = [
    "<root>",
    "  <header>",
    "    <title>Example</title>",
    "  </header>",
    "  <body>",
    "    <text>Data</text>",
    "  </body>",
    `<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha512"/><ds:DigestValue>KgDZLOqn82MK1Z+A9JMUQSKv5I0vKWPLKzDm+k1xdRIQy40dRbd5flRA1NTMFn+VJYArsXteChDwTcyaTUPHug==</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>aAouzXXzrVWdGRcen+5IqRB00lBirrK2lZcS7L4IGSjSJZcFKLs8R43gpObclNY6q4jvFB+31mR7KSdQZn7kobf86XMFMsvUk7/BYNJRkD+HmS9bVlhtyEJihXpHfh5kHElpWFq4giASjIV2yc/5L84/F/613FqwoA2Zhq03hBDc5pCDHXS9GSDXH0wAzQCYqefU7qINkpJx8vYTTbxlYeeO4+XC/f3wiRvxf8OaC2vCxuse2Gma4eEMVF2X2awhZks15ePiC3ONAC1SC3dnZS0T4HLSnYqUXpaeepBDXKas0IAR2GIf8cgmE9qN904U/1JentJbnDFICpiaBWht6Q==</ds:SignatureValue><ds:KeyInfo><ds:KeyValue><ds:RSAKeyValue><ds:Modulus>2pmRFZm9X2h+WAcu9df7o1n0oAlxZdcnrtlKSfeZ+PCCG+m2A2sVW5IAv/q/ypDDpqby5yuZ2716u+5SogOZvp1vP/oOuy9JKioYq8a9dzVc8qGjKi9GzURrUHYMFi306r9xuxgH+3p+sZfCW/4Xzz1h8gGd+QkLLKCOWZ2fByFqOAIMNZcpAWTDxME3VGljF1ALRGfdon0HWlmA81hfaIT7xZtIf1F/clKtwzTx9Ei45kQmkGYvj+qM5Ov+AXnjszpN+TJii9SDoR6PmAK2xrIoCilI+FDYuEyMIas9jRZoe8mYplwa56WTjeeIKQ+IxU13qR4ONscUwKMmdrsu/w==</ds:Modulus><ds:Exponent>AQAB</ds:Exponent></ds:RSAKeyValue></ds:KeyValue></ds:KeyInfo></ds:Signature></root>`,
  ].join("\n");

  const doc = xmldsig.Parse(xmlSigned);
  const signature = doc.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");

  const signedXml = new xmldsig.SignedXml(doc);
  signedXml.LoadXml(signature[0]);

  const ok = await signedXml.Verify();
  console.log("Signature:", ok); // Signature: true
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
