<template>
  <div class="app-container">
    <template v-if="loading">
      <div class="text-center">
        <i class="el-icon-loading" />
      </div>
    </template>
    <template v-else>
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
    </template>

  </div>
</template>
<script>

import BaseTablePro from '@/components/Base/BaseTablePro'
import { postProList as postList, postCreate, postUpdate, postDelete } from '@/api/post'
import { FormConfigFactory } from '@/utils/form/FormConfigFactory'
import TableHeaderControls from '@/components/TableHeaderControls'
import ColModifyAndDel from '@/components/ColModifyAndDel'
import DateArea from '@/components/Base/Input/DateArea'
import SelectEnum from '@/components/Base/Input/SelectEnum'
import CellTagsById from '@/components/Cell/CellTagsById'
import CellEnum from '@/components/Cell/CellEnum'

const tagIdFindQueryKey = 'TAG_FIND_ID_ARR'
export default {
  components: { BaseTablePro, TableHeaderControls },
  data() {
    return {
      loading: true,
      tableConfig: null,
      searchConfig: null,
      textMap: null,
      formOptions: { labelWidth: '120px' },
      tableOptions: { mutiSelect: true },
      formConfig: null,
      formRulesFun: null,
      postList,
      postCreate,
      postUpdate,
      dialogFormVisible: false,
      modifyRow: null
    }
  },
  created() {
    this.enumInit()
  },
  methods: {
    listInit() {
      const query = this.$route.query
      let tagsDef = query.tags || []
      if (!Array.isArray(tagsDef)) {
        tagsDef = [tagsDef]
      }
      // 过滤无效id
      tagsDef = tagsDef.filter(id => this.$store.state.enumMap.tags.find(v => v.value === id))
      const tableConfig = [
        { label: '标题', prop: 'title' },
        { label: '分类', prop: 'category', type: 'dom', dom: CellEnum, enumKey: 'categories' },
        { label: '标签', prop: 'tags', type: 'dom', dom: CellTagsById },
        { label: '创建时间', prop: 'createdAt', type: 'time', width: 140, sortable: 'custom' },
        { label: '创建人', prop: 'createdBy.name' },
        { label: '修改时间', prop: 'updatedAt', type: 'time', width: 140, sortable: 'custom' },
        { label: '修改人', prop: 'updatedBy.name' },
        { label: '操作', prop: 'control', type: 'dom', dom: ColModifyAndDel, fixed: 'right' }
      ]
      const searchConfig = [
        { label: '名称', prop: 'name_contains' },
        { label: '分类', prop: 'category', type: 'dom', dom: SelectEnum, enumKey: 'categories', multiple: false, default: null },
        { label: '标签', prop: tagIdFindQueryKey, type: 'dom', dom: SelectEnum, enumKey: 'tags', multiple: true, default: tagsDef },
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
      temp.add({ label: '分类', prop: 'category', type: 'dom', dom: SelectEnum, enumKey: 'categories' })

      const formConfig = temp.getFormConfig()
      const formRulesFun = self => temp.getFormRules({ mdName, self })
      this.tableConfig = tableConfig
      this.searchConfig = searchConfig
      this.textMap = textMap
      this.formConfig = formConfig
      this.formRulesFun = formRulesFun
    },
    enumInit() {
      this.loading = true
      return this.$store.dispatch('enumMap/setEnum', { key: this.enumKey, init: true }).finally(_ => {
        this.listInit()
        this.loading = false
      })
    },
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
