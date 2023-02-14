import { Crypto } from "@peculiar/webcrypto";
import { Convert } from "pvtsutils";
import * as dKey from "2key-ratchet";

const crypto = new Crypto();

async function main() {
  dKey.setEngine("@peculiar/webcrypto", crypto);

  // Create Alice's identity
  const aliceID = await dKey.Identity.create(16453, 1);

  // Create PreKeyBundle
  const alicePreKeyBundle = new dKey.PreKeyBundleProtocol();
  await alicePreKeyBundle.identity.fill(aliceID);
  alicePreKeyBundle.registrationId = aliceID.id;

  // Add info about signed PreKey
  const preKey = aliceID.signedPreKeys[0];
  alicePreKeyBundle.preKeySigned.id = 0;
  alicePreKeyBundle.preKeySigned.key = preKey.publicKey;
  await alicePreKeyBundle.preKeySigned.sign(aliceID.signingKey.privateKey);

  // Convert proto to bytes
  const alicePreKeyBundleProto = await alicePreKeyBundle.exportProto();
  console.log("Alice's bundle: ", Convert.ToHex(alicePreKeyBundleProto));

  // Create Bob's identity
  const bobID = await dKey.Identity.create(0, 1);

  // Bob retrieves Alice's prekey bundle and initializes a session
  const bundle = await dKey.PreKeyBundleProtocol.importProto(alicePreKeyBundleProto);
  const bobCipher = await dKey.AsymmetricRatchet.create(bobID, bundle);

  // Bob encrypts the message and sends it to Alice
  const bobMessageProto = await bobCipher.encrypt(Convert.FromUtf8String("Hello Alice!!!"));
  const bobMessage = await bobMessageProto.exportProto();
  console.log("Bob's encrypted message:", Convert.ToHex(bobMessage));

  // Alice receives Bob's message and decrypts it
  // Note: The first message from Bob must be PreKeyMessage
  const proto = await dKey.PreKeyMessageProtocol.importProto(bobMessage);
  // Create Alice's cipher for Bob's message
  const aliceCipher = await dKey.AsymmetricRatchet.create(aliceID, proto);
  // Decrypt message
  const bytes = await aliceCipher.decrypt(proto.signedMessage);
  console.log("Bob's decrypted message:", Convert.ToUtf8String(bytes));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Output
 * 
 * Alice's bundle:  000108c5800112e20100010a405dd12954af52c39f4f621c3d5f812a44273ee56a8ae043fd29c1714a0528bc6a7d7b1dd52870a9ba6a249a6d111e4cec9a0456b2e8feca2097cf261f21ad9aae12407db2e9380806b57a291c6e71e8867b9608011d4345d63e5c43c8f3f2ba7f7d173f4aeb717b1640d5c4ac111da1925fad0227eae90df6d6d872a0b231fe1501681a40e7abca27a06012bb202bb8cb66293e4d588ae62da9f29114baea7a3a045b842dc1243a82e0012fad6e84657988a7baba5e2953cec11ab8a6ab0c9c53e2c52fd32218323032332d30322d31345431323a33353a33382e3334365a22880100010800124081b1ccb527ab5775e9664131a0e15934c125b313604a7ca328696f5917992bd6c18f8b0144817e2d78efcba9c66cadeefcdaff58b8ac46c942fa3ab22b7e58b81a40a4809e8a99c7fa5c5f3f73ebad717471e54922c775e99698b219e5b641c5731eea727296d5bbf86116102fbca47c76cbe7bf4fa5709e4b0e91c2320ddae5c9d6
 * Bob's encrypted message: 0001080018002240c915929955ef9b897b4695ab2da576c7f553ef981193a345d69922715e4c5f33c05752e2f24805472422c067b318fc4092f5f8382b8a4b491c39a4765c4e89f42ae20100010a40cacdf30c9e46154178c06030f2c8675c224b590eee1fcef1e3e79a24f7cae21ce8d63e614a77c4c42cf97e0ded342566c234a047dac423250d1dc01c505f56a61240d0e13e618172f7b46f8a04a329d0b5f5a3575f4ce7529e5680d3536908b58760c4d190b66d9f42778da84d9aabe5a8bfba5a4ccd00d0ed5ea8940cab0f701d871a404e1eda7e95ba6f0141b04305f21dd91d44c613d6498b3c5c57ba6a4b97419011696761aa816e18a69d0abb673b0f7d630cbeb08c8ed4224de9cf08edb2f2dafb2218323032332d30322d31345431323a33353a33382e3336355a32c20100010a40cacdf30c9e46154178c06030f2c8675c224b590eee1fcef1e3e79a24f7cae21ce8d63e614a77c4c42cf97e0ded342566c234a047dac423250d1dc01c505f56a6125a00010a40c915929955ef9b897b4695ab2da576c7f553ef981193a345d69922715e4c5f33c05752e2f24805472422c067b318fc4092f5f8382b8a4b491c39a4765c4e89f4100018002210fc44423254fab991022e279bfa0a1c1e1a20dd548250f2b1c6dc46a978887c38a832469ea806560e0cda673b22957e576a51
 * Bob's decrypted message: Hello Alice!!!
 */