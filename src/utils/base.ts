const AseKey = 'abcopekiYHJFMGTO';
const {AES, enc, mode, pad} = require('crypto-js')
const mergeClassName = (...arg: string[]) => {
  return arg.join(" ").trim()
}
/**
 * @summary 加密
 * @param message 
 * @param key 
 * @returns 
 */
const encrypt =  (message: string, key: string = AseKey) => {
  return AES.encrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString()
}

/**
 * @summary 解密
 * @param message 
 * @param key 
 * @returns 
 */
const decrypt =  (message: string, key: string = AseKey) => {
  return AES.decrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString(enc.Utf8);
}
/**
 * @summary 千分符参数
 * @param {*} num 数据源
 */
const thousands = (num: number): string => {
  if (typeof num === 'string' || typeof num === 'number') {
    return (num.toString().indexOf('.') !== -1) ? Number(num).toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
  return num
}
/**
* @summary 路径参数解析
* @param {*} url 解析路径
*/
const getQueryObject = (url: string): object => {
  url = url ? window.location.href : url
  let search = url.substring(url.lastIndexOf('?') + 1)
  let obj: {
    [key: string]: any
  } = {}
  let reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, function (rs, $1, $2) {
    let name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export {
  mergeClassName,
  encrypt,
  decrypt,
  thousands,
  getQueryObject
}