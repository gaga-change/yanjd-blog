<template>
  <div class="text-right mb15">
    <component :is="formDialogCom" v-bind="$attrs" :get-list="getList" :select-row="selectRow" :md-name="mdName" :modify-row="modifyRow" v-on="$listeners" />
    <el-button type="primary" plain @click="handleCreate()">新增</el-button>
    <el-button type="danger" plain @click="handleDel">删除</el-button>
  </div>
</template>
<script>
import FormDialog from './FormDialog'
export default {
  props: {
    selectRow: {
      type: Array,
      default: () => []
    },
    modifyRow: {
      type: Object,
      default: null
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
    },
    deleteApi: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      activeBtnLoading: false,
      unActiveBtnLoading: false,
      delBtnLoading: false
    }
  },
  methods: {
    // 新增
    handleCreate() {
      this.$emit('update:modifyRow', null)
      this.$nextTick(() => {
        this.$emit('update:visible', true)
      })
    },
    // 删除
    handleDel() {
      const temp = [...this.selectRow]
      if (this.selectRow.length === 0) {
        return this.$message.warning('请勾选列表项')
      } else if (temp.length === 0) {
        return this.$message.warning('请选择无效的数据进行操作')
      }
      this.deleteApi(temp)
    }
  }
}
</script>
