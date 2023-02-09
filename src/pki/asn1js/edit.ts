import * as asn1js from "asn1js";

async function main() {
  const raw = Buffer.from("301006082a03040506070809020165020100", "hex");

  // Parse the ASN.1 structure
  const asn1 = asn1js.fromBER(raw);

  // Print the decoded ASN.1 result
  console.log(asn1.result.toString());

  // SEQUENCE :
  //   OBJECT IDENTIFIER : 1.2.3.4.5.6.7.8.9
  //   INTEGER : 101
  //   INTEGER : 0

  const certTemplate = asn1.result;
  if (!(certTemplate instanceof asn1js.Sequence)) {
    throw new Error("Incorrect schema. Must be SEQUENCE.");
  }

  certTemplate.valueBlock.value[2] = new asn1js.Integer({ value: 12345 });

  // Print the updated ASN.1 structure
  console.log(certTemplate.toString());

  // SEQUENCE :
  //   OBJECT IDENTIFIER : 1.2.3.4.5.6.7.8.9
  //   INTEGER : 101
  //   INTEGER : 12345

  // Encode the ASN.1 structure
  const encRaw = certTemplate.toBER();
  console.log(encRaw); // BER encoded ASN.1 structure
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

