const AseKey = 'abcopekiYHJFMGTO';
const mergeClassName = (...arg: string[]) => {
  return arg.join(" ").trim()
}
//加密
const encrypt = async (message: string, key: string = AseKey) => {
  let { AES, enc, mode, pad } = await import('crypto-js');
  return AES.encrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString()
}

//解密
const decrypt = async (message: string, key: string = AseKey) => {
  let { AES, enc, mode, pad } = await import('crypto-js');
  return AES.decrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString(enc.Utf8);
}
export {
  mergeClassName,
  encrypt,
  decrypt
}