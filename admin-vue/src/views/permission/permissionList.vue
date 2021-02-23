<template>
  <div class="app-container">
    <BaseTablePro
      ref="baseTablePro"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :table-options="tableOptions"
      md-name=""
      :fetch-list="permissionList"
      @handleModify="handleModify"
      @handleDelete="handleDelete"
    >
      <TableHeaderControls
        slot="header"
        slot-scope="scope"
        :form-config="formConfig"
        :form-rules-fun="formRulesFun"
        :text-map="textMap"
        :form-options="formOptions"
        :create-api="permissionCreate"
        :update-api="permissionUpdate"
        :delete-api="handleDelete"
        :visible.sync="dialogFormVisible"
        v-bind="scope"
        :modify-row.sync="modifyRow"
      />
    </BaseTablePro>
  </div>
</template>
<script>

import BaseTablePro from '@/components/Base/BaseTablePro'
import { permissionList, permissionCreate, permissionUpdate, permissionDelete } from '@/api/permission'
import { FormConfigFactory } from '@/utils/form/FormConfigFactory'
import TableHeaderControls from '@/components/TableHeaderControls'
import ColModifyAndDel from '@/components/ColModifyAndDel'
import DateArea from '@/components/Base/Input/DateArea'

export default {
  components: { BaseTablePro, TableHeaderControls },
  data() {
    const tableConfig = [
      { label: '名称', prop: 'name' },
      { label: '描述', prop: 'remark' },
      { label: '创建时间', prop: 'createdAt', type: 'time', width: 140, sortable: 'custom' },
      { label: '创建人', prop: 'createdBy.name' },
      { label: '修改时间', prop: 'updatedAt', type: 'time', width: 140, sortable: 'custom' },
      { label: '修改人', prop: 'updatedBy.name' },
      { label: '操作', prop: 'control', type: 'dom', dom: ColModifyAndDel, fixed: 'right' }
    ]
    const searchConfig = [
      { label: '名称', prop: 'name_contains' },
      { label: '创建时间', type: 'dom', dom: DateArea, prop: 'createdAt_between' },
      { label: '修改时间', type: 'dom', dom: DateArea, prop: 'updatedAt_between' }
    ]
    const textMap = {
      update: '编辑权限',
      create: '新增权限'
    }
    const mdName = 'createPermission'
    const temp = new FormConfigFactory()

    temp.add({ label: '权限名称', prop: 'name' })
      .valid({ req: true, len: 100 })
    temp.add({ label: '描述', prop: 'remark' })

    const formConfig = temp.getFormConfig()
    const formRulesFun = self => temp.getFormRules({ mdName, self })
    return {
      tableConfig,
      searchConfig,
      permissionList,
      textMap,
      formOptions: { labelWidth: '120px' },
      tableOptions: { mutiSelect: true },
      formConfig,
      formRulesFun,
      permissionCreate,
      permissionUpdate,
      dialogFormVisible: false,
      modifyRow: null
    }
  },
  methods: {
    handleModify(row) {
      this.modifyRow = row
      this.dialogFormVisible = true
    },
    // 删除
    handleDelete(data) {
      const temp = Array.isArray(data) ? data : [data]
      this.$apiConfirm(`是否确定删除【${temp.map(v => v.name).join('，')}】？`, () => permissionDelete(temp.map(v => v.id))).then(_ => {
        this.$message.success('操作成功！')
        this.$refs['baseTablePro'].getList()
      }).catch(() => {})
    }
  }
}
</script>
