<template>
  <div class="table TableComponent">
    <el-table
      id="iTable"
      v-loading.iTable="options.loading"
      :height="options.height"
      :data="data"
      :border="options.border"
      :cell-style="options.cellStyle"
      :stripe="options.stripe"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="options.showIndex" label="序号" width="55px">
        <template slot-scope="scope">
          {{ (pagination.page - 1) * pagination.limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" width="48px" />
      <el-table-column v-if="options.radioSelect" key="radio" label="选择" width="48px">
        <template slot-scope="scope">
          <el-radio v-model="radioRow" :label="scope.row[idKey]">
            <span />
          </el-radio>
        </template>
      </el-table-column>
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)" />
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index" />
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
      <!--region 按钮操作组-->
      <el-table-column
        v-if="operates.list.filter(_x=>_x.show === true).length > 0"
        ref="fixedColumn"
        label="操作"
        align="center"
        :width="operates.width"
        :fixed="operates.fixed"
      >
        <template slot-scope="scope">
          <span v-for="(btn, key) in operates.list" :key="key">
            <el-button
              v-if="(typeof btn.show == 'function')?btn.show(key,scope.row):btn.show"
              style="margin: 0 4px;"
              :type="btn.type"
              size="mini"
              :disabled="(typeof btn.disabled == 'function')?btn.disabled(key,scope.row):btn.disabled"
              :plain="btn.plain"
              @click.native.prevent="btn.method(key,scope.row)"
            >{{ btn.label }}
            </el-button>
          </span>
        </template>
      </el-table-column>
      <!--endregion-->
    </el-table>

    <el-pagination
      v-if="options.pagination"
      :total="pagination.total"
      :page-sizes="[10, 20, 50]"
      :page-size.sync="pagination.limit"
      :current-page.sync="pagination.page"
      layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
      style="margin-top: 15px;text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
    />
  </div>
</template>
<!--endregion-->
<script>
export default {
  // 组件
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => { // 作用渲染视图，相当于template
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    }
  },
  props: {
    idKey: {
      type: String,
      default: 'id'
    },
    data: {
      type: Array,
      default: () => []
    }, // 数据列表
    columns: {
      type: Array,
      default: () => []
    }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    operates: {}, // 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
    options: {
      type: Object,
      default: () => ({
        stripe: true, // 是否为斑马纹 table
        border: true, // 是否边框
        highlightCurrentRow: false // 是否要高亮当前行
      }),
      pagination: true
    }, // table 表格的控制参数
    pagination: Object // 分页

  },
  // 数据
  data() {
    return {
      radioRow: null,
      pageIndex: 1,
      multipleSelection: [] // 多行选中
    }
  },
  computed: {},
  watch: {
    radioRow(val) {
      this.$emit('handleRadioChange', val)
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    test() {

    },
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    handleRowClick(val) {
      this.$emit('handleRowClick', val)
    },
    handleSizeChange(size) {
      this.radioRow = null
      this.$emit('handleSizeChange', size)
    },
    /* 切换页码*/
    handleIndexChange(current) {
      this.radioRow = null
      this.$emit('handleIndexChange', current)
    }
  }
}
</script>
<style lang="scss">
.TableComponent {
  .el-table-column--selection .cell {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
