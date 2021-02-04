<template>
  <component :is="com" v-bind="$attrs" :type="type" :placeholder="placeholder" v-on="$listeners" />
</template>

<script>
import { DatePicker, Input } from 'element-ui'
import SelectEnum from '@/components/Base/Input/SelectEnum'
import DateTimeEnd from '@/components/Base/Input/DateTimeEnd'
import DateTimeStart from '@/components/Base/Input/DateTimeStart'
import RadioGroup from '@/components/Base/Input/RadioGroup'
import InputNumber from '@/components/Base/Input/InputNumber'

export default {
  props: {
    type: {
      type: String,
      default: 'input'
    },
    label: {
      type: String,
      default: ''
    },
    dom: {
      type: Object
    },
    placeholder: {
      type: String,
      default() {
        if (['input', 'number', 'textarea'].includes(this.type)) {
          return `请输入${this.label}`
        } else if (['datetime', 'date', 'aEnum'].includes(this.type)) {
          return `请选择${this.label}`
        } else if (['dateStart', 'dateEnd'].includes(this.type)) {
          return `请选择日期`
        } else {
          return undefined
        }
      }
    }
  },
  computed: {
    com() {
      const { type, dom } = this
      switch (type) {
        case 'input':
          return Input
        case 'datetime':
          return DatePicker
        case 'date':
          return DatePicker
        case 'dateStart':
          return DateTimeStart
        case 'dateEnd':
          return DateTimeEnd
        case 'number':
          return InputNumber
        case 'radio':
          return RadioGroup
        case 'dom':
          return dom
        case 'aEnum':
          return SelectEnum
        default:
          return GlInput
      }
    }
  }
}
</script>
