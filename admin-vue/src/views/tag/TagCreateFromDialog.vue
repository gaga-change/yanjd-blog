<template>
  <div>
    <el-dialog v-bind="$attrs" title="新增年级" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form ref="elForm" :model="formData" :rules="rules" size="mini" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" clearable :style="{width: '100%'}" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { tagCreate, tagUpdate } from '@/api/tags'
export default {
  name: 'GradeCreateFromDialog',
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    return {
      loading: false,
      formData: {
        name: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
      delete this.formData.id
    },
    setDefault(row) {
      this.formData.name = row.name
      this.formData.id = row.id
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.loading = true
        const api = this.formData.id ? tagUpdate : tagCreate
        const params = [{ name: this.formData.name }]
        if (this.formData.id) {
          params.unshift(this.formData.id)
        }
        api(...params).then(res => {
          this.$emit('submited')
          this.close()
        }).catch((error) => {
          const { keyValue } = error.response.data
          if (keyValue && keyValue.name) {
            this.$message.error(`班级【${keyValue.name}】名称已存在，不能重复添加`)
          }
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}

</script>
<style>
</style>
