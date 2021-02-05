<template>
  <el-select
    v-bind="$attrs"
    :clearable="true"
    :loading="loading"
    :multiple="multiple"
    v-on="$listeners"
  >
    <el-option
      v-for="option in enumOptions"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </el-select>
</template>

<script>

export default {
  props: {
    aEnum: {
      type: Array,
      default: () => []
    },
    enumKey: {
      type: String,
      default: ''
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    enumOptions() {
      if (this.enumKey) {
        return this.$store.state.enumMap.enumMap[this.enumKey]
      } else {
        return this.aEnum
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.enumKey) {
        this.loading = true
        this.$store.dispatch('enumMap/setEnum', { key: this.enumKey, init: true }).finally(_ => {
          this.loading = false
        })
      }
    }
  }
}
</script>

