<template>
  <el-select
    v-bind="$attrs"
    :clearable="true"
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
    }
  },
  computed: {
    localEnum() {
      if (this.enumKey) {
        return this.$store.state.aEnum[this.enumKey]
      } else {
        return this.aEnum
      }
    },
    enumOptions() {
      return this.localEnum
    }
  }
}
</script>

