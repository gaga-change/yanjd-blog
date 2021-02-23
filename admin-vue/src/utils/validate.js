/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

// 手机号码
export function validPhone(str) {
  return /^1[345678]\d{9}$/.test(str)
}

// 手机号码 含区号
export function validPhoneNumber(str) {
  const reg = /^\+\d{1,4}-1[345678]\d{9}$/
  return reg.test(str)
}

// 座机号码 含区号
export function validTelphone(str) {
  const reg = /^(0\d{2,3}-)?\d{7,8}$/
  return reg.test(str)
}
