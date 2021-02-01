<template>
  <div class="app-container">
    <BaseTablePro
      ref="baseTablePro"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :table-options="tableOptions"
      md-name=""
      :fetch-list="tagList"
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
        :create-api="tagCreate"
        :update-api="tagUpdate"
        :visible.sync="dialogFormVisible"
        v-bind="scope"
        :modify-row.sync="modifyRow"
      />
    </BaseTablePro>
  </div>
</template>
<script>

import BaseTablePro from '@/components/Base2/BaseTablePro'
import { tagList, tagCreate, tagUpdate, tagDelete } from '@/api/tags'
import { FormConfigFactory } from '@/utils/form/FormConfigFactory'
import TableHeaderControls from '@/views/tag2/TableHeaderControls'
import TagListControl from '@/views/tag2/TagListControl'

export default {
  components: { BaseTablePro, TableHeaderControls },
  data() {
    const tableConfig = [
      { label: '名称', prop: 'name' },
      { label: '创建时间', prop: 'createdAt', type: 'time', width: 140, sortable: 'custom' },
      { label: '创建人', prop: 'creator.name' },
      { label: '修改时间', prop: 'updatedAt', type: 'time', width: 140, sortable: 'custom' },
      { label: '修改人', prop: 'modifier.name' },
      { label: '操作', prop: 'control', type: 'dom', dom: TagListControl }
    ]
    const searchConfig = [
      { label: '名称', prop: 'name_contains' }
    ]
    const textMap = {
      update: '编辑标签',
      create: '新增标签'
    }
    const mdName = 'createTag'
    const temp = new FormConfigFactory()

    temp.add({ label: '标签名称', prop: 'name' })
      .valid({ req: true, len: 10 })
    // temp.add({ label: '国家中文名称', prop: 'countryNameCn' })
    //   .valid({ req: true, len: 20 }).unique()
    // temp.add({ label: '国家英文名称', prop: 'countryNameEn' })
    //   .valid({ req: false, len: 50 }).unique()
    // temp.add({ label: '备注', prop: 'remark', type: 'textarea', autosize: { minRows: 2, maxRows: 4 }})
    //   .valid({ req: false, len: 500 })
    // temp.add({ label: '有效性', prop: 'isValid', type: 'aEnum', aEnum: isValidEnum, hidden: true, default: true })

    const formConfig = temp.getFormConfig()
    const formRulesFun = self => temp.getFormRules({ mdName, self })
    return {
      tableConfig,
      searchConfig,
      tagList,
      textMap,
      formOptions: { labelWidth: '120px' },
      tableOptions: { mutiSelect: true },
      formConfig,
      formRulesFun,
      tagCreate,
      tagUpdate,
      dialogFormVisible: false,
      modifyRow: null
    }
  },
  methods: {
    handleModify(row) {
      console.log(row)
      this.modifyRow = row
      this.dialogFormVisible = true
      console.log('修改按钮点击')
    },
    handleDelete(row) {
      this.$apiConfirm(`是否确定删除【${row.name}】？`, () => tagDelete(row.id)).then(_ => {
        this.$message.success('操作成功！')
        this.$refs['baseTablePro'].getList()
      }).catch(() => {})
    }
  }
}
</script>
