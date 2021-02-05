<template>
  <el-dialog
    width="500px"
    v-bind="$attrs"
    :title="modifyRow ? textMap.update : textMap.create"
    :append-to-body="true"
    @open="dialogFormDestroy=false,onOpen()"
    v-on="$listeners"
    @close="onClose"
    @closed="dialogFormDestroy=true"
  >
    <div v-if="!dialogFormDestroy">
      <BaseForm
        ref="formPanel"
        :form-config="formConfig"
        v-bind="$attrs"
        :value="temp"
        :rules="formRules"
      />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button
        type="primary"
        :loading="submitLoading"
        @click="!modifyRow ? createData() : updateData()"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { isEmptyString } from '@/utils/validateUtil'
import { deepClone } from '@/utils'
import BaseForm from '@/components/Base/BaseForm'
import { pick } from 'lodash'
export default {
  components: { BaseForm },
  inheritAttrs: false,
  props: {
    selectRow: {
      type: Array,
      default: () => []
    },
    mdName: {
      type: [String, Object],
      required: true
    },
    getList: {
      type: Function,
      required: true
    },
    modifyRow: {
      type: Object,
      default: null
    },
    formConfig: {
      type: Array,
      default: () => []
    },
    formRulesFun: {
      type: Function,
      default: () => ({})
    },
    textMap: {
      type: Object,
      default: () => (
        {
          update: '编辑',
          create: '新增'
        }
      )
    },
    createApi: {
      type: Function,
      default: null
    },
    updateApi: {
      type: Function,
      default: null
    }
  },
  data() {
    const idKey = 'id'
    const tempDef = {}
    tempDef[idKey] = undefined
    this.formConfig.forEach((item) => {
      tempDef[item.prop] = undefined
      if (!isEmptyString[item.default]) {
        tempDef[item.prop] = item.default
      }
      return tempDef
    })
    return {
      idKey,
      tempDef,
      formRules: {},
      temp: deepClone(tempDef),
      dialogFormDestroy: true,
      submitLoading: false
    }
  },
  methods: {
    resetTemp() {
      this.temp = deepClone(this.tempDef)
    },
    createInit() {
      this.formRules = this.formRulesFun()
      this.resetTemp()
    },
    createData() {
      this.submitLoading = true
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.createApi && this.createApi(this.temp).then(() => {
            this.getList()
            this.close()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).finally(_ => {
            this.submitLoading = false
          })
        } else {
          this.submitLoading = false
        }
      })
    },
    modifyInit() {
      this.temp = deepClone(this.modifyRow)
      this.formRules = this.formRulesFun(this.temp)
    },
    updateData() {
      this.submitLoading = true
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = deepClone(this.temp)
          this.updateApi && this.updateApi(tempData.id, pick(tempData, ['title', 'tags'])).then(() => {
            this.getList()
            this.close()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }).finally(_ => {
            this.submitLoading = false
          })
        } else {
          this.submitLoading = false
        }
      })
    },
    onOpen() {
      if (this.modifyRow) {
        this.modifyInit()
      } else {
        this.createInit()
      }
    },
    onClose() {
      // this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
