// import { mdKeyUnique } from '@/api/baseApi'
import { validEmail, validPhone, validPhoneNumber, validTelphone } from '@/utils/validate'

const mdKeyUnique = () => false
function trim(val) {
  if (typeof val === 'string') {
    return val.trim()
  } else {
    return val
  }
}
export class ValidateFactoryPro extends Array {
  constructor(options = { req: false, len: 0, uniqueAppendWhere: {}}) {
    super()
    const { req, len, uniqueAppendWhere = {}} = options
    this.uniqueAppendWhere = uniqueAppendWhere
    if (req) {
      this.req()
    }
    if (len) {
      this.len(len)
    }
  }

  getRules(options = { label: undefined, self: undefined, getFormDataFun: undefined, mdName: undefined }) {
    return this.map(fun => fun(options))
  }

  /**
   * 给唯一校验设置过滤 场景：code只能唯一，但允许不同公司下code一样
   * @param uniqueAppendWhere
   */
  setUniqueAppendWhere(uniqueAppendWhere) {
    this.uniqueAppendWhere = uniqueAppendWhere
  }

  req(options = {}) {
    this.push(
      ({ label }) => ({ required: true, message: label ? `${label}不能为空` : '必填项', trigger: ['change', 'blur'], ...options })
    )
    return this
  }

  len(len, options = {}) {
    this.push(({ label }) => ({ max: len, message:
        label ? `${label}长度不能超过${len}个字符`
          : `最大长度应为${len}，且超长无法录入`, trigger: ['change', 'blur'], ...options }))
    return this
  }

  asyncValidator(api, options = {}) {
    this.push((args) => ({
      validator: (rule, value, callback) => {
        if (!trim(value)) return callback()
        return api(rule.field, value, args).then(b => {
          callback()
        }).catch(err => {
          callback(new Error(err))
        })
      },
      trigger: 'blur',
      ...options
    }))
    return this
  }

  unique(options = {}) {
    const { appendWhere = {}} = options
    this.asyncValidator((key, val, { label, mdName, self }) => mdKeyUnique(mdName, key, val, self, this.uniqueAppendWhere || appendWhere).then(b => {
      const message = options.message || (label ? `${label}必须唯一` : '已存在相同值')
      if (b) {
        return Promise.reject(message)
      }
    }), options)
    return this
  }

  regexp(regexp, options = {}) {
    this.push(() => ({
      pattern: regexp,
      ...options
    }))
    return this
  }

  validCb(isTrueCb, options = {}) {
    this.push((args) => ({
      validator: (rule, value, callback) => {
        if (!trim(value)) return callback()
        if (isTrueCb(value, rule, args)) {
          callback()
        } else {
          callback(new Error(options.message))
        }
      },
      trigger: ['blur', 'change'],
      ...options
    }))
    return this
  }

  // 验证手机号码
  phone(options = {}) {
    return this.validCb(val => validPhone(val), { message: '请输入正确的手机号', ...options })
  }

  // 验证手机号码 含区号
  phoneNumber(options = {}) {
    return this.validCb(val => validPhoneNumber(val), { message: '请输入正确的手机号', ...options })
  }

  // 验证座机号码 含区号
  telphone(options = {}) {
    return this.validCb(val => validTelphone(val), { message: '请输入正确的电话号', ...options })
  }

  // 验证邮箱
  email(options = {}) {
    return this.validCb(val => validEmail(val), { message: '请输入正确的邮箱', ...options })
  }

  /**
   * 大于 某值校验
   * @param key 需要大于的值
   * @param options
   * @returns {ValidateFactoryPro}
   */
  ge(key, options = {}) {
    return this.validCb((val, rule, { getFormDataFun }) => {
      const data = getFormDataFun()
      if (data[key]) {
        return data[key] < val
      } else {
        return true
      }
    }, { ...options })
  }
}
