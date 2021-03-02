<template>
  <div class="markdown-con">
    <template v-if="!initLoading">
      <div v-loading="saveLoading">
        <editor
          ref="editor"
          :initial-value="editorText"
          :options="editorOptions"
          height="100vh"
          @load="onEditorLoad"
          @focus="onEditorFocus"
          @blur="onEditorBlur"
          @change="onEditorChange"
          @stateChange="onEditorStateChange"
        />
        <div class="btn-control">
          <el-button type="primary" @click="handlePreview">预览</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </div>

    </template>
    <template v-else>
      <div class="pt20 text-center">
        <i class="el-icon-loading" />
      </div>
    </template>
    <MarkdownPreview :visible.sync="previewShow" :preview-html="previewHtml" />
  </div>
</template>
<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/i18n/zh-cn.js'
import { postDetail, postUpdate } from '@/api/post'
import { defaultOptions } from '@/views/markdown/defaultOptions'
import MarkdownPreview from '@/views/markdown/MarkdownPreview'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

export default {
  components: {
    editor: Editor,
    MarkdownPreview
  },
  data() {
    return {
      previewHtml: '',
      initLoading: true,
      saveLoading: false,
      previewShow: false,
      detail: null,
      editorText: '123',
      editorOptions: {
        ...defaultOptions,
        viewer: true,
        plugins: [[codeSyntaxHighlight, { hljs }], colorSyntax]
      }
    }
  },
  computed: {
    postId() {
      return this.$route.query.postId
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (!this.postId) return
      this.initLoading = true
      postDetail(this.postId).then(data => {
        if (!data) {
          return this.$alert('文章或被删除不存在', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.replace({ name: 'postList' })
            }
          })
        }
        this.detail = data
        this.editorText = data.markdown || ''
      }).finally(() => {
        this.initLoading = false
      })
    },
    handleSave() {
      this.saveLoading = true
      const html = this.$refs.editor.invoke('getHtml')
      const markdown = this.$refs.editor.invoke('getMarkdown')
      postUpdate(this.postId, { html, markdown }).then(res => {
        this.$message.success('保存成功')
      }).finally(() => {
        this.saveLoading = false
      })
    },
    handlePreview() {
      this.previewHtml = this.$refs.editor.invoke('getHtml')
      this.previewShow = true
    },
    onEditorLoad() {
      console.log('onEditorLoad')
    },
    onEditorFocus() {
      console.log('onEditorFocus')
    },
    onEditorBlur() {
      console.log('onEditorBlur')
    },
    onEditorChange() {
      console.log('onEditorChange')
    },
    onEditorStateChange() {
      console.log('onEditorStateChange')
    }
  }
}
</script>

<style lang="scss" scoped>
  .markdown-con {
    position: relative;
    .btn-control {
      position: absolute;
      display: flex;
      align-items: center;
      right: 10px;
      top: 0;
      height: 33px;
    }
  }
</style>
