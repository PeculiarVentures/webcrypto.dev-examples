import * as asn1 from "@peculiar/asn1-schema";

interface CertificateTemplateParams {
  templateID: string;
  templateMajorVersion?: number;
  templateMinorVersion?: number;
}

/**
 * ```asn
 * CertificateTemplateOID ::= SEQUENCE {
 *   templateID              OBJECT IDENTIFIER,
 *   templateMajorVersion    INTEGER (0..4294967295) OPTIONAL,
 *   templateMinorVersion    INTEGER (0..4294967295) OPTIONAL
 * } --#public
 * ```
 */
class CertificateTemplate {

  @asn1.AsnProp({ type: asn1.AsnPropTypes.ObjectIdentifier })
  public templateID = "";

  @asn1.AsnProp({ type: asn1.AsnPropTypes.Integer, optional: true })
  public templateMajorVersion?: number;

  @asn1.AsnProp({ type: asn1.AsnPropTypes.Integer, optional: true })
  public templateMinorVersion?: number;

  /**
   * Instantiate a CertificateTemplate with optional params
   * @param params Parameters
   */
  constructor(params?: CertificateTemplateParams) {
    if (params) {
      this.templateID = params.templateID;
      if (params.templateMajorVersion !== undefined) {
        this.templateMajorVersion = params.templateMajorVersion;
      }
      if (params.templateMinorVersion !== undefined) {
        this.templateMinorVersion = params.templateMinorVersion;
      }
    }
  }
}

async function main() {
  // Create a new instance of CertificateTemplate with the specified params.
  const certTemplate = new CertificateTemplate({
    templateID: "1.2.3.4.5.6",
    templateMajorVersion: 1,
    templateMinorVersion: 2,
  });

  // Serialize the instance data.
  const raw = asn1.AsnConvert.serialize(certTemplate);

  // Output the serialized data.
  console.log(raw); // ArrayBuffer <30 0d 06 05 2a 03 04 05 06 02 01 01 02 01 02>

  // Converts the given CertificateTemplate instance to a string of its ASN.1 encoding
  const asn = asn1.AsnConvert.toString(certTemplate);
  console.log(asn);
  // SEQUENCE :
  //   OBJECT IDENTIFIER : 1.2.3.4.5.6
  //   INTEGER : 1
  //   INTEGER : 2
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
