<template>
  <div class="text-right mb15">
    <component :is="formDialogCom" v-bind="$attrs" :get-list="getList" :select-row="selectRow" :md-name="mdName" :visible.sync="dialogFormVisible" :modify-row="modifyRow" />
    <el-button type="primary" plain @click="handleCreate()">新增</el-button>
    <el-button type="info" plain @click="handleUpdate">编辑</el-button>
    <el-button type="success" plain :loading="activeBtnLoading" @click="handleActive()">生效</el-button>
    <el-button type="warning" plain :loading="unActiveBtnLoading" @click="handleUnActive()">失效</el-button>
    <el-button type="danger" plain @click="handleDel">删除</el-button>
  </div>
</template>
<script>
// import { apiDeleteModel, apiUpdateModel } from '@/api/baseApi'
import { filter } from 'lodash'
import FormDialog from './FormDialog'
export default {
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
    formDialogCom: {
      type: Object,
      default: () => FormDialog
    }
  },
  data() {
    return {
      modifyRow: null,
      dialogFormVisible: false,
      activeBtnLoading: false,
      unActiveBtnLoading: false,
      delBtnLoading: false
    }
  },
  methods: {
    // 新增
    handleCreate() {
      this.modifyRow = null
      this.$nextTick(() => {
        this.dialogFormVisible = true
      })
    },
    // 修改
    handleUpdate(row) {
      if (this.selectRow.length !== 1) {
        return this.$message.warning('请勾选列表中的一条')
      }
      this.modifyRow = this.selectRow[0]
      this.$nextTick(() => {
        this.dialogFormVisible = true
      })
    },
    // 生效
    handleActive() {
      if (this.selectRow.length === 0) {
        return this.$message.warning('请勾选列表项')
      }
      let isContinue = true
      for (const i of this.selectRow) {
        if (i.isValid) {
          isContinue = false
        }
      }
      if (!isContinue) {
        return this.$message.warning('请选择无效的数据进行操作')
      }
      // this.activeBtnLoading = true
      // apiUpdateModel(this.mdName, this.selectRow.map(v => ({ ...v, isValid: 1 })), ['isValid'])
      //   .then(res => {
      //     this.$message.success('操作成功')
      //     this.getList()
      //   })
      //   .finally(() => {
      //     this.activeBtnLoading = false
      //   })
    },
    // 失效
    handleUnActive() {
      if (this.selectRow.length === 0) {
        return this.$message.warning('请勾选列表项')
      }
      let isContinue = true
      for (const i of this.selectRow) {
        if (!i.isValid) {
          isContinue = false
        }
      }
      if (!isContinue) {
        return this.$message.warning('请选择有效的数据进行操作')
      }
      // this.unActiveBtnLoading = true
      // apiUpdateModel(this.mdName, this.selectRow.map(v => ({ ...v, isValid: 0 })), ['isValid'])
      //   .then(res => {
      //     this.$message.success('操作成功')
      //     this.getList()
      //   })
      //   .finally(() => {
      //     this.unActiveBtnLoading = false
      //   })
    },
    // 删除
    handleDel(index, row) {
      const temp = filter(this.selectRow, { isValid: false })
      if (this.selectRow.length === 0) {
        return this.$message.warning('请勾选列表项')
      } else if (temp.length === 0) {
        return this.$message.warning('请选择无效的数据进行操作')
      }
      // this.$apiConfirm(`是否确认删除？`, () =>
      //   apiDeleteModel(this.mdName, temp).then(res => {
      //     this.$message.success('删除成功')
      //     this.getList()
      //   })
      // ).catch(() => {})
    }
  }
}
</script>
