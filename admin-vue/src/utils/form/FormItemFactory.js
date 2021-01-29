import { ValidateFactoryPro } from './validateFactoryPro'

export class FormItem {
  constructor(options) {
    const { label, prop } = options
    this.options = options
    this.label = label
    this.prop = prop
    this.rulesFactory = null
    this.uniqueAppendWhere = {}
  }

  /**
   * 给唯一校验设置过滤 场景：code只能唯一，但允许不同公司下code一样
   * @param uniqueAppendWhere
   */
  setUniqueAppendWhere(uniqueAppendWhere) {
    this.uniqueAppendWhere = uniqueAppendWhere
  }

  getItemOptions() {
    return this.options
  }

  getRules(options = { getFormDataFun: undefined, mdName: undefined, self: undefined }) {
    if (this.rulesFactory) {
      return this.rulesFactory.getRules({
        label: this.label,
        ...options
      })
    }
    return []
  }

  valid(options) {
    options.label = this.label
    const validate = new ValidateFactoryPro(options)
    validate.setUniqueAppendWhere(this.uniqueAppendWhere)
    this.rulesFactory = validate
    return validate
  }
  //
  // inputType() {
  //   this.type = 'input'
  //   return this
  // }
  //
  // enumType(enumArr) {
  //   this.type = 'enum'
  //   this.enumArr = enumArr
  //   return this
  // }
  //
  // datetimeType() {
  //   this.type = 'datetime'
  //   return this
  // }
  //
  // domType(dom) {
  //   this.type = 'dom'
  //   this.dom = dom
  //   return this
  // }
}
