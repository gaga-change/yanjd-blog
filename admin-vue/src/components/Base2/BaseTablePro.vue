<template>
  <div class="">
    <!-- 查询组件 -->
    <filp-filter-panel
      v-if="searchConfig.length > 0"
      ref="searchForm"
      :value="listQuery"
      v-bind="{...$attrs, searchConfig}"
      v-on="$listeners"
      @search="handleFilter"
      @reset="handleReset"
    />
    <div>
      <slot name="header" v-bind="{selectRow, mdName, listQuery, getList}" />
    </div>
    <!-- 表格组件 -->
    <component
      :is="tableComponent"
      ref="BaseTable"
      v-loading="tableLoading"
      :id-key="idKey"
      :data="list"
      :get-list="getList"
      :highlight="highlight"
      :pagination="listQuery"
      v-bind="{...$attrs,tableConfig}"
      v-on="$listeners"
      @handleSortChange="handleSortChange"
      @handleSelectionChange="handleSelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleIndexChange="handleIndexChange"
    />
  </div>
</template>

<script>
import BaseTable from './BaseTable' // 表单组件
import FilpFilterPanel from './FilpFilterPanel'
import { omit, cloneDeepWith, omitBy, isNil } from 'lodash'
// import { apiListFactory } from '@/api/baseApi'

/**
 * props:
 *  *mdName
 *  tableConfig
 *  searchConfig
 *  defaultSearchFilter 默认查询条件
 *  listDataFilter 列表数据过滤
 *
 *  子组件BaseTable
 *  tableOptions
 * event:
 *  子组件BaseTable
 *  handleRadioChange(row) 单选
 */
export default {
  components: { FilpFilterPanel },
  props: {
    tableComponent: {
      type: Object,
      default: () => BaseTable
    },
    mdName: {
      type: [String, Object],
      required: true
    },
    tableConfig: {
      type: Array,
      default: () => []
    },
    searchConfig: {
      type: Array,
      default: () => []
    },
    // 默认附加查询条件
    defaultSearchFilter: {
      type: Object,
      default: () => ({})
    },
    // 列表数据过滤器
    listDataFilter: {
      type: Function,
      default: (res) => ({ list: res.data.items, total: res.data.total })
    },
    // 分页
    pagination: {
      type: Object,
      default: () => ({
        page: 1,
        limit: 20,
        total: 0
      })
    },
    // 初始是否加载数据
    beginGetList: {
      type: Boolean,
      default: false
    },
    // BaseTable选中行是否高亮显示
    highlight: {
      type: Boolean,
      default: false
    },
    fetchList: {
      type: Function,
      default: () => ({ list: [], total: 0 })
    }
  },
  data() {
    // const fetchList = apiListFactory(this.mdName, this.searchConfig, this.tableConfig)
    const searchKeyValueDef = this.searchConfig.reduce((obj, item) => {
      if (item.default !== null && item.default !== undefined) {
        obj[item.prop] = item.default
      } else {
        obj[item.prop] = undefined
      }
      return obj
    }, {})
    // const page = this.pagination
    return {
      initData: true, // 组件是否初始创建
      idKey: 'id',
      searchKeyValueDef,
      // fetchList,
      tableLoading: false,
      selectRow: [],
      list: [],
      sortRule: {
        createdAt: 'descending'
      },
      listQuery: {
        ...this.pagination,
        ...searchKeyValueDef
      }
    }
  },
  computed: {
    sortStr() {
      const res = []
      const orderSmall = { ascending: 'asc', descending: 'desc' }
      Object.keys(this.sortRule).forEach(key => {
        if (this.sortRule[key]) {
          const order = this.sortRule[key]
          res.push(`${key}:${orderSmall[order]}`)
        }
      })
      return res.join(',')
    }
  },
  activated() {
    if (!this.initData && !this.beginGetList) {
      this.getList()
    }
  },
  deactivated() {
    this.initData = false
  },
  created() {
    // 初始不加载
    if (!this.beginGetList) {
      this.getList()
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectRow = val
    },
    handleSizeChange(size) {
      this.listQuery.page = 1
      this.listQuery.limit = size
      this.getList()
    },
    handleIndexChange(page) {
      this.listQuery.page = page
      this.getList()
    },
    // 排序方式修改
    handleSortChange(val) {
      this.$set(this.sortRule, val.prop, val.order)
      this.$nextTick(() => {
        this.getList()
      })
    },
    changePagination() {},
    getList() {
      this.tableLoading = true
      const { page, limit, ...query } = omit(this.listQuery, ['total'])
      this.fetchList({
        _limit: limit,
        _start: (page - 1) * limit,
        _sort: this.sortStr,
        ...cloneDeepWith(query, obj => {
          const v = { ...obj }
          Object.keys(v).forEach(key => {
            // 对 _between解析 解析为大于小于
            if (~key.indexOf('_between')) {
              const valArr = v[key]
              const prop = key.split('_between')[0]
              v[prop + '_gte'] = valArr && valArr[0]
              v[prop + '_lte'] = valArr && valArr[1]
              delete v[key]
            }
          })
          return omitBy(v, val => isNil(val) || val === '')
        })
      }).then(res => {
        this.list = res.list
        this.listQuery.total = res.total
        this.$emit('tableDataChange')
      }).finally(_ => {
        this.tableLoading = false
      })
    },
    handleReset() {
      this.listQuery = {
        ...this.listQuery,
        page: 1,
        ...this.searchKeyValueDef
      }
      this.getList()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
<style lang="scss" scope>

</style>
