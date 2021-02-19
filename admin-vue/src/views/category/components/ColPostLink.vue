<template>
  <el-link type="primary" @click="postCountClick">
    {{ postCount }}
  </el-link>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  computed: {
    postCount() {
      return this.row && this.row.postCount || ''
    }
  },
  methods: {
    postCountClick() {
      this.$router.push({ name: 'postList', query: { category: this.row.id }})
    }
  }
}
</script>
