<template>
  <div class="app-container">
    <BaseTablePro
      ref="baseTablePro"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :table-options="tableOptions"
      md-name=""
      :fetch-list="userList"
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
        :create-api="userCreate"
        :update-api="userUpdate"
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
import { userList, userCreate, userUpdate, userDelete } from '@/api/user'
import { FormConfigFactory } from '@/utils/form/FormConfigFactory'
import TableHeaderControls from '@/components/TableHeaderControls'
import ColModifyAndDel from '@/components/ColModifyAndDel'
import DateArea from '@/components/Base/Input/DateArea'
import AvatarUpload from '@/views/user/components/AvatarUpload'
import ColAvatar from '@/views/user/components/ColAvatar'

export default {
  components: { BaseTablePro, TableHeaderControls },
  data() {
    const tableConfig = [
      { label: '名称', prop: 'name' },
      { label: '头像', prop: 'avatar', type: 'dom', dom: ColAvatar },
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
      update: '编辑用户',
      create: '新增用户'
    }
    const mdName = 'createUser'
    const temp = new FormConfigFactory()

    temp.add({ label: '用户名称', prop: 'name' })
      .valid({ req: true, len: 10 })
    temp.add({ label: '头像', prop: 'avatar', type: 'dom', dom: AvatarUpload })

    const formConfig = temp.getFormConfig()
    const formRulesFun = self => temp.getFormRules({ mdName, self })
    return {
      tableConfig,
      searchConfig,
      userList,
      textMap,
      formOptions: { labelWidth: '120px' },
      tableOptions: { mutiSelect: true },
      formConfig,
      formRulesFun,
      userCreate,
      userUpdate,
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
      this.$apiConfirm(`是否确定删除【${temp.map(v => v.name).join('，')}】？`, () => userDelete(temp.map(v => v.id))).then(_ => {
        this.$message.success('操作成功！')
        this.$refs['baseTablePro'].getList()
      }).catch(() => {})
    }
  }
}
</script>
