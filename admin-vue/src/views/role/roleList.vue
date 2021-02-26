<template>
  <div class="app-container">
    <BaseTablePro
      ref="baseTablePro"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :table-options="tableOptions"
      md-name=""
      :fetch-list="roleList"
      @handleModify="handleModify"
      @handleDelete="handleDelete"
    >
      <TableHeaderControls
        slot="header"
        slot-scope="scope"
        width="80%"
        :form-config="formConfig"
        :form-rules-fun="formRulesFun"
        :text-map="textMap"
        :form-options="formOptions"
        :create-api="roleCreate"
        :update-api="roleUpdate"
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
import { roleProList as roleList, roleCreate, roleUpdate, roleDelete } from '@/api/role'
import { FormConfigFactory } from '@/utils/form/FormConfigFactory'
import TableHeaderControls from '@/components/TableHeaderControls'
import ColModifyAndDel from '@/components/ColModifyAndDel'
import DateArea from '@/components/Base/Input/DateArea'
import CheckEnums from '@/components/Base/Input/CheckEnums'

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
      update: '编辑角色',
      create: '新增角色'
    }
    const mdName = 'createRole'
    const temp = new FormConfigFactory()

    temp.add({ label: '角色名称', prop: 'name' })
      .valid({ req: true, len: 10 })
    temp.add({ label: '描述', prop: 'remark' })
    temp.add({ label: '权限', prop: 'permissions', type: 'dom', dom: CheckEnums, enumKey: 'permissions' })

    const formConfig = temp.getFormConfig()
    const formRulesFun = self => temp.getFormRules({ mdName, self })
    return {
      tableConfig,
      searchConfig,
      roleList,
      textMap,
      formOptions: { labelWidth: '120px' },
      tableOptions: { mutiSelect: true },
      formConfig,
      formRulesFun,
      roleCreate,
      roleUpdate,
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
      this.$apiConfirm(`是否确定删除【${temp.map(v => v.name).join('，')}】？`, () => roleDelete(temp.map(v => v.id))).then(_ => {
        this.$message.success('操作成功！')
        this.$refs['baseTablePro'].getList()
      }).catch(() => {})
    }
  }
}
</script>
