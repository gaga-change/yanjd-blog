<template>
  <div>
    <template v-if="!loading">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group :value="value" @input="handleInput" @change="handleCheckedCitiesChange">
        <el-divider>query</el-divider>
        <el-checkbox v-for="item in enumOptionsIsQuery" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
        <el-divider>mutation</el-divider>
        <el-checkbox v-for="item in enumOptionsIsMutation" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
      </el-checkbox-group>
    </template>
    <template v-else>
      <i class="el-icon-loading" />
    </template>
  </div>
</template>

<script>
import { difference } from 'lodash'
export default {
  props: {
    value: {
      type: Array,
      default: Array
    },
    enumKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    isIndeterminate() {
      const temp = difference(this.enumOptions.map(v => v.value), this.value || [])
      return temp.length > 0 && temp.length !== this.enumOptions.length
    },
    checkAll() {
      const temp = difference(this.enumOptions.map(v => v.value), this.value || [])
      return temp.length === 0
    },
    enumOptions() {
      if (this.enumKey) {
        return this.$store.state.enumMap[this.enumKey]
      } else {
        return this.aEnum
      }
    },
    enumOptionsIsQuery() {
      return this.enumOptions.filter(v => v.isQuery)
    },
    enumOptionsIsMutation() {
      return this.enumOptions.filter(v => !v.isQuery)
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleInput(val) {
      const temp = difference(val, this.enumOptions.map(v => v.value))
      // 去除无效id
      if (temp.length) {
        val = difference(val, temp)
      }
      this.$emit('input', val)
    },
    handleCheckAllChange(val) {
      this.$emit('input', val ? this.enumOptions.map(v => v.value) : [])
    },
    handleCheckedCitiesChange(value) {

    },
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
