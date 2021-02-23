<template>
  <div>
    <el-link type="primary" class="f12" @click="handleModify">修改</el-link>
    <el-divider direction="vertical" />
    <el-link type="info" class="f12" @click="handleResetPwd">重置密码</el-link>
    <el-divider direction="vertical" />
    <el-link type="warning" class="f12" @click="handleDelete">删除</el-link>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      required: true
    },
    getList: {
      type: Function,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleModify() {
      this.$emit('handleModify', this.row)
    },
    handleDelete() {
      this.$emit('handleDelete', this.row)
    },
    handleResetPwd() {
      this.$emit('handleResetPwd', this.row)
    }
  }
}
</script>
