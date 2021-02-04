<template>
  <el-radio-group
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-radio v-for="item in enumOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  props: {
    aEnum: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    enumOptions() {
      return this.aEnum
    }
  }
}
</script>
