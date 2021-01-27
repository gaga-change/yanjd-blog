<template>
  <el-date-picker
    type="date"
    :placeholder="placeholder"
    v-bind="$attrs"
    value-format="timestamp"
    :picker-options="localPickerOptions"
    v-on="$listeners"
  ></el-date-picker>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    pickerOptions: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pickerOptionsDef: {
        disabledDate: (time) => { // 此处改为箭头函数
          const arr = ['Highway', 'Railway', 'CivilAviation', 'Waterway']
          if (this.$router.history && arr.indexOf(this.$router.history.current.name) !== -1) {
            var now = new Date()
            return time.getTime() < now.setHours(0, 0, 0, 0)
          }
        }
      }
    }
  },
  computed: {
    localPickerOptions() {
      return this.pickerOptions || this.pickerOptionsDef
    }
  },
  created() {
    const value = this.$attrs.value
    if (typeof value === 'string' && value.length > 1) {
      this.$emit('input', new Date(value))
    }
  }
}
</script>
