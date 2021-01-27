/**
 * 全角转半角
 * @param {string} str
 */
function toCDB(str) {
  let tmp = ''
  const length = str.length
  let i
  for (i = 0; i < length; i++) {
    if ((str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375)) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i))
    }
  }
  tmp = tmp.replace('　', ' ')
  return tmp
}

function trimValue(trim, value) {
  let reg = null
  const trimStr = '\\s+'
  switch (trim) {
    case 'ltrim':
      reg = new RegExp('^' + trimStr, 'g')
      break
    case 'rtrim':
      reg = new RegExp(trimStr + '$', 'g')
      break
    case 'atrim':
      reg = new RegExp(trimStr, 'g')
      break
    case 'trim':
    case '':
      reg = new RegExp('^' + trimStr + '|' + trimStr + '$', 'g')
  }
  return value.replace(reg, '')
}

/**
 * 去空格处理
 * @param {string} str
 * @param {string} trimType
 * @returns {string}
 */
function trim(str, trimType) {
  let reg
  switch (trimType) {
    case 'ltrim':
      reg = /^\s*/g
      break
    case 'rtrim':
      reg = /\s*$/g
      break
    case 'atrim':
      reg = /\s*/g
      break
    case 'trim':
      reg = /^\s*|\s*$/g
      break
    default:
      return str
  }
  return str.replace(reg, '')
}

/**
 * 大小写转换
 * @param {string} str
 * @param {string} caseType
 * @returns {string}
 */
function changeCase(str, caseType) {
  switch (caseType) {
    case 'upper':
      return str.toUpperCase()
    case 'lower':
      return str.toLowerCase()
    default:
      return str
  }
}

export {
  toCDB,
  trimValue,
  trim,
  changeCase
}
