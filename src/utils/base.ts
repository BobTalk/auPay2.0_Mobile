import dayjs from "dayjs";

const AseKey = 'abcopekiYHJFMGTO';
const { AES, enc, mode, pad, DES } = require('crypto-js')
const SessionStorage = window.sessionStorage
const mergeClassName = (...arg: string[]) => {
  return arg.join(" ").trim()
}
const dataType = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase()
}
/**
 * @summary 加密
 * @param message 
 * @param key 
 * @returns 
 */
const encrypt = (message: string, key: string = AseKey) => {
  return AES.encrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString()
}
const encryptByDES = (message: string, key: string = AseKey) => {
  return DES.encrypt(message, enc.Utf8.parse(key), {
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
const decrypt = (message: string | null | undefined, key: string = AseKey) => {
  if (!message) return message
  return AES.decrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString(enc.Utf8);
}

/**
 * @summary 获取session
 * @param {*} name 
 */
function getSession(name: string) {
  let value: any = decrypt(SessionStorage.getItem(name))
  try {
    value = JSON.parse(value)
    if (value['_flag'] === 'boolean') {
      value = Boolean(Number(value.val))
    }
    return value
  } catch (error) {
    return value
  }
}
/**
* @summary 设置session
* @param {*} name 
* @param {*} value 
*/
function setSession(name: string, value: any) {
  if (dataType(value) === 'boolean') value = JSON.stringify({ _flag: 'boolean', val: Number(value) })
  else if (dataType(value) === 'object') value = JSON.stringify({ ...value, _flag: 'object' })
  return SessionStorage.setItem(name, encrypt(value))
}
/**
* @summary 移除某一个session
* @param {*} name 
*/
function removeSession(name: string) {
  return SessionStorage.removeItem(name)
}

/**
 * @summary 千分符参数
 * @param {*} num 数据源
 */
const thousands = (num: number): string => {
  if (!num) return "0";
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
// 日期处理
const timeFormate = (time: string, format: string = 'YYYY-MM-DD'): string => {
  return dayjs(time).format(format)
}
// 单位处理
let formatUnit = (id: number, chain?: number) => {
  let unit = "EOS";
  let num = 0;
  if (id === 1) {
    unit = "BTC";
    num = 6;
  } else if (id === 2) {
    unit = "ETH";
    num = 6;
  } else if (id === 3) {
    if (chain === 1) {
      unit = "USDT-OMNI";
      num = 6;
    }
    if (chain === 2) {
      unit = "USDT-ERC20";
      num = 6;
    }
    if (chain === 3) {
      unit = "USDT-TRC20";
      num = 19;
    }
  } else {
    unit = "TRX";
    num = 19;
  }
  return { unit, num };
};
export {
  mergeClassName,
  encrypt,
  decrypt,
  thousands,
  getQueryObject,
  dataType,
  setSession,
  getSession,
  removeSession,
  encryptByDES,
  timeFormate,
  formatUnit
}