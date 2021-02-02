<template>
  <el-date-picker
    type="daterange"
    v-bind="$attrs"
    align="right"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    value-format="timestamp"
    v-on="$listeners"
    @change="change"
  />
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true
    },
    prop: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    change(val) {
      if (val) {
        const dateStart = new Date(val[0])
        const dateEnd = new Date(val[1])
        dateStart.setHours(0, 0, 0, 0)
        dateEnd.setHours(23, 59, 59, 999)
        this.$emit('input', [dateStart.getTime(), dateEnd.getTime()])
      }
    }
  }
}
</script>
