/*
   const obj = fa(getForm, ((add, typeMap) => {
      add('label', 'prop').valid({true, 100}).
      add('label', 'prop').type(typeMap.enum, {placeholder}).valid({true, 100}).eq()
      add('label', 'prop').type(typeMap.number, {}})valid({true, 100}).eq()
   ))
   const {formConfig, formRules, formConfigObj} = obj

  const obj = new Fa()
  obj.setGetForm = () => this.fromData
  obj.add('label', 'prop').valid({true, 100}).
  obj.add('label', 'prop').inputType(typeMap.enum, {placeholder}).valid({true, 100}).eq()
  obj.add('label', 'prop').enumType().valid({true, 100}).eq()
  const formConfig = obj.getFormConfig
  const formRules = obj.getFormRules
*/

import { FormItem } from '@/utils/form/FormItemFactory'

export class FormConfigFactory {
  constructor() {
    this.items = []
    this.uniqueAppendWhere = {}
  }

  add(options) {
    const temp = new FormItem(options)
    temp.setUniqueAppendWhere(this.uniqueAppendWhere)
    this.items.push(temp)
    return temp
  }

  /**
   * 给唯一校验设置过滤 场景：code只能唯一，但允许不同公司下code一样
   * @param uniqueAppendWhere
   */
  setUniqueAppendWhere(uniqueAppendWhere) {
    this.uniqueAppendWhere = uniqueAppendWhere
  }

  getFormConfig() {
    return this.items.map(v => {
      return v.getItemOptions()
    })
  }
  getFormConfigObj() {
    const obj = {}
    this.items.forEach(v => {
      obj[v.prop] = v.getItemOptions()
    })
    return obj
  }
  getFormRules(setOption = { getFormDataFun: undefined, mdName: undefined, self: undefined }) {
    const obj = {}
    this.items.forEach(v => {
      const { prop } = v
      obj[prop] = v.getRules(setOption)
    })
    return obj
  }
}
