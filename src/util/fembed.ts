import * as CryptoJS from "crypto-js";
const CryptoJSAesJson = {
  stringify: function(cipherParams) {
    let j: { iv?: any; s?: any; ct: any } = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
    };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse: function(jsonStr) {
    let j = JSON.parse(jsonStr);
    let cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct)
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  }
};
export default function(e, t) {
  try {
    return JSON.parse(
      CryptoJS.AES.decrypt(e, t, { format: CryptoJSAesJson }).toString(
        CryptoJS.enc.Utf8
      )
    );
  } catch (er) {
    return null;
  }
}
