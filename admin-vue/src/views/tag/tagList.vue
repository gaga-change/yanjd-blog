<template>
  <div class="app-container">
    <base-list
      ref="baseList"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :api="listApi"
      :show-control="true"
      :btn-inline="true"
      :control-width="160"
    >
      <template slot-scope="scope">
        <el-link
          type="warning"
          @click="handleDelete(scope.row)"
        >删除</el-link>
        <el-divider direction="vertical" />
        <el-link
          type="primary"
          @click="handleUpdate(scope.row)"
        >修改</el-link>
      </template>
      <template slot="btns">
        <div class="text-right">
          <el-button
            type="primary"
            size="mini"
            @click="handleCreate"
          >
            新建
          </el-button>
        </div>
      </template>
    </base-list>
    <TagCreateFromDialog ref="TagCreateFromDialog" :visible.sync="TagCreateFromDialogVisible" @submited="getTableData" />
  </div>
</template>

<script>
import TagCreateFromDialog from './TagCreateFromDialog'
import { tagIndex, tagDelete } from '@/api/tags'
const tableConfig = [
  { label: '名称', prop: 'name' },
  { label: '创建时间', prop: 'createdAt', type: 'time', width: 140 },
  { label: '修改时间', prop: 'updatedAt', type: 'time', width: 140 }
]
const searchConfig = [
  { label: '名称', prop: 'name_contains' }
]
export default {
  components: { TagCreateFromDialog },
  data() {
    return {
      TagCreateFromDialogVisible: false,
      tableConfig,
      searchConfig,
      listApi: tagIndex,
      // 可选 附加查询条件
      appendSearchParams: {}
    }
  },
  methods: {
    /** 刷新列表 */
    getTableData() {
      this.$refs['baseList'].fetchData()
    },
    /** 可选 返回列表添加字段 */
    parseData(res) {
      const data = res.data.list || []
      const total = res.data.total
      data.forEach(v => {
        v.updateLockStatusOutLoading = false
        v.updateLockStatusInLoading = false
      })
      return { data, total }
    },
    /** 新建 */
    handleCreate() {
      this.TagCreateFromDialogVisible = true
    },
    /** 修改 */
    handleUpdate(row) {
      this.TagCreateFromDialogVisible = true
      this.$nextTick(() => {
        this.$refs['TagCreateFromDialog'].setDefault(row)
      })
    },
    /** 删除 */
    handleDelete(row) {
      this.$apiConfirm(`是否确定删除【${row.name}】？`, () => tagDelete(row.id)).then(_ => {
        this.$message.success('操作成功！')
        this.getTableData()
      }).catch(() => {})
    }
  }
}
</script>
