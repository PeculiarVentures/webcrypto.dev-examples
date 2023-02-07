// This mock replaces `<script src="webcrypto-liner.shim.js"></script>`
import * as nodeCrypto from "node:crypto";

const globalWindow = {
  crypto: nodeCrypto.webcrypto,
  navigator: {
    userAgent: "chrome/1.1",
  }
} as any;
globalThis.window = globalWindow;
globalThis.self = globalWindow;

const webcrypto = require("webcrypto-liner");
globalThis.crypto = new webcrypto.Crypto;
