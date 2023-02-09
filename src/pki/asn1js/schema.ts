import * as asn1js from "asn1js";

interface CertificateTemplate {
  templateID: asn1js.ObjectIdentifier;
  templateMajorVersion: asn1js.Integer;
  templateMinorVersion: asn1js.Integer;
}

async function main() {
  // CertificateTemplate ::= SEQUENCE {
  //   templateID OBJECT IDENTIFIER,
  //   templateMajorVersion INTEGER,
  //   templateMinorVersion INTEGER
  // }
  const certTemplateSchema = new asn1js.Sequence({
    value: [
      new asn1js.ObjectIdentifier({ name: "templateID" }),
      new asn1js.Integer({
        name: "templateMajorVersion",
        optional: true
      }),
      new asn1js.Integer({
        name: "templateMinorVersion",
        optional: true
      }),
    ]
  });

  const raw = Buffer.from("301006082a03040506070809020165020100", "hex");
  const asn1 = asn1js.fromBER(raw);

  const compareResult = asn1js.compareSchema(
    {} as asn1js.AsnType,
    asn1.result,
    certTemplateSchema,
  );
  if (!compareResult.verified) {
    throw new Error("Incoming data doesn't match ASN.1 CertificateTemplate schema");
  }

  const certTemplate = compareResult.result as unknown as CertificateTemplate;

  console.log("templateID:", certTemplate.templateID.valueBlock.toString()); // templateID:: 1.2.3.4.5.6.7.8.9
  console.log("templateMajorVersion:", certTemplate.templateMajorVersion.valueBlock.valueDec); // templateMajorVersion:: 101
  console.log("templateMinorVersion:", certTemplate.templateMinorVersion.valueBlock.valueDec); // templateMinorVersion:: 0
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

