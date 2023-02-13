import * as asn1 from "@peculiar/asn1-schema";
import { CertificateTemplate } from "@peculiar/asn1-x509-microsoft";

async function main() {
  const raw = new Uint8Array([0x30, 0x0d, 0x06, 0x05, 0x2a, 0x03, 0x04, 0x05, 0x06, 0x02, 0x01, 0x01, 0x02, 0x01, 0x02]);

  // Create new CertificateTemplate instance from the raw array
  const certTemplate = asn1.AsnConvert.parse(raw, CertificateTemplate);

  // Log the parsed CertificateTemplate object
  console.log(certTemplate);
  // CertificateTemplate {
  //   templateID: '1.2.3.4.5.6',
  //   templateMajorVersion: 1,
  //   templateMinorVersion: 2
  // }

  // Update the `templateMinorVersion`
  certTemplate.templateMinorVersion = 12345;

  // Convert the CertificateTemplate instance to a string of its ASN.1 encoding
  const asn = asn1.AsnConvert.toString(certTemplate);
  console.log(asn);
  // SEQUENCE :
  //   OBJECT IDENTIFIER : 1.2.3.4.5.6
  //   INTEGER : 1
  //   INTEGER : 12345

  // Serialize the instance data.
  const raw2 = asn1.AsnConvert.serialize(certTemplate);
  console.log(raw2); // ArrayBuffer <30 0e 06 05 2a 03 04 05 06 02 01 01 02 02 30 39>
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
