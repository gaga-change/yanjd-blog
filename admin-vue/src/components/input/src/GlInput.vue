<script>
import { Input } from 'element-ui'
import { toCDB, trimValue } from '@/utils/utils'
export default {
  name: 'ElInput',
  extends: Input,
  props: {
    dbc: { type: Boolean, default: true },
    trim: { type: String, default: 'trim' }
  },
  data() {
    return {}
  },
  methods: {
    focus() {
      this.getInput().focus()
    },
    handleInput(event) {
      let targetValue = event.target.value
      if (this.isComposing) return
      if (targetValue === this.nativeInputValue) return
      if (this.dbc) {
        targetValue = toCDB(targetValue)
      }
      if (this.$attrs.case) {
        if (this.$attrs.case === 'upper') {
          targetValue = targetValue.toUpperCase()
        } else if (this.$attrs.case === 'lower') {
          targetValue = targetValue.toLowerCase()
        }
      }
      this.$emit('input', targetValue)
      this.$nextTick(this.setNativeInputValue)
    },
    handleBlur(event) {
      const targetValue = event.target.value
      this.focused = false
      if (this.trim !== undefined) {
        const value = trimValue(this.trim, targetValue)
        this.$emit('input', value)
        this.$nextTick(this.setNativeInputValue)
      }
      this.$emit('blur', event)

      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value])
      }
    }
  }
}
</script>
