<template>
  <component :is="com" v-bind="$attrs" :type="type" :placeholder="placeholder" v-on="$listeners" />
</template>

<script>
import { DatePicker } from 'element-ui'
import SelectEnum from '@/components/Base2/Input/SelectEnum'
import DateTimeEnd from '@/components/Base2/Input/DateTimeEnd'
import DateTimeStart from '@/components/Base2/Input/DateTimeStart'
import RadioGroup from '@/components/Base2/Input/RadioGroup'
import GlInput from '@/components/input/src/GlInput'
import InputNumber from '@/components/Base2/Input/InputNumber'

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
          return GlInput
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
