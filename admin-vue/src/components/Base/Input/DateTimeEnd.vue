<template>
  <el-date-picker
    type="date"
    :placeholder="placeholder"
    :value="value"
    v-bind="$attrs"
    value-format="timestamp"
    :picker-options="localPickerOptions"
    v-on="$listeners"
    @change="change"
  ></el-date-picker>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Date],
      default: undefined
    },
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
    const value = this.value
    if (typeof value === 'string' && value.length > 1) {
      const initDate = new Date(value)
      initDate.setHours(23, 59, 59, 999)
      this.$emit('input', initDate)
    }
  },
  methods: {
    change(val) {
      if (val) {
        this.$emit('input', new Date(val).setHours(23, 59, 59, 999))
      }
    }
  }
}
</script>
