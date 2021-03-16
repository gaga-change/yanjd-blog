<template>
  <el-drawer
    v-bind="$attrs"
    size="80%"
    :with-header="false"
    class="markdown-preview"
    v-on="$listeners"
    @opened="opened"
  >
    <div ref="markdownCon" class="app-container" v-html="previewHtml" />
  </el-drawer>
</template>
<script>
import hljs from 'highlight.js'
export default {
  props: {
    previewHtml: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    opened() {
      const dom = this.$refs['markdownCon']
      dom.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  }
}
</script>
<style scoped lang="scss">
 .markdown-preview ::v-deep .el-drawer {
    overflow: auto;
  }
</style>
