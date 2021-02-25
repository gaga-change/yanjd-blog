<template>
  <el-drawer
    v-bind="$attrs"
    size="80%"
    :with-header="false"
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
      console.log('opened', dom)
      dom.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  }
}
</script>
