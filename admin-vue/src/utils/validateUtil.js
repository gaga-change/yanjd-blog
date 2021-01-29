
export function isEmptyString(value) {
  return (!notNullVal(value) || (isString(value) && value.length === 0))
}

export function notNullVal(value) {
  return isDefined(value) && value !== null
}

function isDefined(value) {
  return typeof value !== 'undefined'
}

function isString(value) {
  return typeof value === 'string'
}

