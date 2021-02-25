<template>
  <div>
    <el-link type="primary" class="f12" @click="handleModify">修改</el-link>
    <el-divider direction="vertical" />
    <router-link :to="{name: 'markdown', query: {postId: row.id}}">内容编辑</router-link>
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
    }
  }
}
</script>
