import * as asn1js from "asn1js";

async function main() {
  const certTemplate = new asn1js.Sequence({
    value: [
      new asn1js.ObjectIdentifier({ value: "1.2.3.4.5.6.7.8.9" }),
      new asn1js.Integer({ value: 101 }),
      new asn1js.Integer({ value: 0 }),
    ],
  });

  // Print the ASN.1 structure
  console.log(certTemplate.toString());

  // SEQUENCE :
  //   OBJECT IDENTIFIER : 1.2.3.4.5.6.7.8.9
  //   INTEGER : 101
  //   INTEGER : 0

  // Encode the ASN.1 structure
  const encRaw = certTemplate.toBER();
  console.log(encRaw); // BER encoded ASN.1 structure
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

