<template>
  <div class="app-container">
    <BaseTablePro
      ref="baseTablePro"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :table-options="tableOptions"
      :list-data-filter="listDataFilter"
      :query-filter="queryFilter"
      md-name=""
      :fetch-list="postList"
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
        :create-api="postCreate"
        :update-api="postUpdate"
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
import { postProList as postList, postCreate, postUpdate, postDelete } from '@/api/post'
import { FormConfigFactory } from '@/utils/form/FormConfigFactory'
import TableHeaderControls from '@/components/TableHeaderControls'
import PostListControl from '@/components/ColModifyAndDel'
import DateArea from '@/components/Base/Input/DateArea'
import SelectEnum from '@/components/Base/Input/SelectEnum'
import CellTagsById from '@/components/Cell/CellTagsById'

const tagIdFindQueryKey = 'TAG_FIND_ID_ARR'
export default {
  components: { BaseTablePro, TableHeaderControls },
  data() {
    const tableConfig = [
      { label: '标题', prop: 'title' },
      { label: '标签', prop: 'tags', type: 'dom', dom: CellTagsById },
      // { label: '标签', prop: 'tagIds' },
      { label: '创建时间', prop: 'createdAt', type: 'time', width: 140, sortable: 'custom' },
      { label: '创建人', prop: 'createdBy.name' },
      { label: '修改时间', prop: 'updatedAt', type: 'time', width: 140, sortable: 'custom' },
      { label: '修改人', prop: 'updatedBy.name' },
      { label: '操作', prop: 'control', type: 'dom', dom: PostListControl }
    ]
    const searchConfig = [
      { label: '名称', prop: 'name_contains' },
      { label: '标签', prop: tagIdFindQueryKey, type: 'dom', dom: SelectEnum, enumKey: 'tags', multiple: true },
      { label: '创建时间', type: 'dom', dom: DateArea, prop: 'createdAt_between' },
      { label: '修改时间', type: 'dom', dom: DateArea, prop: 'updatedAt_between' }
    ]
    const textMap = {
      update: '编辑文章',
      create: '新增文章'
    }
    const mdName = 'createPost'
    const temp = new FormConfigFactory()

    temp.add({ label: '文章标题', prop: 'title' })
      .valid({ req: true, len: 10 })
    temp.add({ label: '标签', prop: 'tags', type: 'dom', dom: SelectEnum, enumKey: 'tags', multiple: true })

    const formConfig = temp.getFormConfig()
    const formRulesFun = self => temp.getFormRules({ mdName, self })
    return {
      tableConfig,
      searchConfig,
      postList,
      textMap,
      formOptions: { labelWidth: '120px' },
      tableOptions: { mutiSelect: true },
      formConfig,
      formRulesFun,
      postCreate,
      postUpdate,
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
      this.$apiConfirm(`是否确定删除【${temp.map(v => v.name).join('，')}】？`, () => postDelete(temp.map(v => v.id))).then(_ => {
        this.$message.success('操作成功！')
        this.$refs['baseTablePro'].getList()
      }).catch(() => {})
    },
    queryFilter(query) {
      // 标签多选查询条件处理
      const tagIds = query[tagIdFindQueryKey]
      if (tagIds && tagIds.length > 1) {
        query['and'] = tagIds.map(id => {
          return { tagIds_contains: id }
        })
      } else if (tagIds && tagIds.length === 1) {
        query['tagIds_contains'] = tagIds[0]
      }
      delete query[tagIdFindQueryKey]
      return query
    },
    listDataFilter(res) {
      const { list, total } = res
      return {
        list: list.map(v => {
          const tagArr = [...(v.tags || [])]
          return { ...v, tagArr, tags: tagArr.map(v => v.id) }
        }),
        total
      }
    }
  }
}
</script>
