<template>
  <div class="">
    <el-table
      :height="options.height"
      :data="data"
      tooltip-effect="dark"
      :border="options.border"
      :cell-style="options.cellStyle"
      :stripe="options.stripe"
      :highlight-current-row="highlight"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="options.showIndex" label="序号" width="55px" :align="align">
        <template slot-scope="scope">
          {{ (pagination.page - 1) * pagination.limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" width="48px" :align="align" />
      <el-table-column v-if="options.radioSelect" key="radio" label="选择" width="48px" :align="align">
        <template slot-scope="scope">
          <el-radio v-model="radioRow" :label="scope.row[idKey]">
            <span />
          </el-radio>
        </template>
      </el-table-column>
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columnsComputed">
        <el-table-column
          :key="index"
          show-overflow-tooltip
          :prop="column.prop"
          :label="column.label"
          :align="column.align?column.align:align"
          :width="column.width"
          :fixed="column.fixed"
        >
          <template slot-scope="scope">
            <template v-if="column.type === 'dom'">
              <!--              <component :is="column.dom" :prop="column.prop" :a-enum="column.aEnum" v-bind="column" :row="scope.row" :index="scope.$index" v-on="$listeners" />-->
              <component :is="column.dom" v-bind="column" :row="scope.row" :index="scope.$index" v-on="$listeners" />
            </template>
            <template v-else-if="!column.render">
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
import { deepClone, parseTime } from '@/utils'

/**
 * 组件说明
 * prop:
 *  data: Array 数据
 *  idKey: String 数据主键，单选时需要
 *  tableOptions
 *  tableConfig
 *  pagination: {total, limit, page}
 */

/**
 * 参数
 * @type {{border: boolean, showIndex: boolean, pagination: boolean, stripe: boolean, highlightCurrentRow: boolean, radioSelect: boolean, mutiSelect: boolean}}
 */
const optionsDef = {
  showIndex: true,
  mutiSelect: false, // 多选
  radioSelect: false, // 单选
  border: true,
  stripe: true, // 是否为斑马纹 table
  highlightCurrentRow: true, // 是否支持当前行高亮显示
  pagination: true
}
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
    data: {
      type: Array,
      default: () => []
    }, // 数据列表
    tableConfig: {
      type: Array,
      default: () => []
    }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    tableOptions: {
      type: Object,
      default: () => (deepClone(optionsDef))
    }, // table 表格的控制参数
    pagination: {
      type: Object,
      default: () => {}
    }, // 分页
    align: {
      type: String,
      default: 'left'
    },
    idKey: {
      type: String,
      default: ''
    },
    // 选中行是否高亮显示
    highlight: {
      type: Boolean,
      default: false
    }
  },
  // 数据
  data() {
    return {
      operates: { list: [] },
      radioRow: null,
      pageIndex: 1,
      multipleSelection: [] // 多行选中
    }
  },
  computed: {
    options() {
      return {
        ...deepClone(optionsDef),
        ...this.tableOptions
      }
    },
    columnsComputed() {
      const columns = deepClone(this.tableConfig)
      return columns.filter(v => v.label).map(item => {
        const { type, prop, aEnum: enums, format } = item
        if (type === 'aEnum') {
          item.formatter = (row, column, cellValue) => {
            const item = enums.find(v => v.value === row[prop])
            return item ? item.label : ''
          }
        } else if (type === 'time' || type === 'datetime') {
          item.formatter = (row, column, cellValue) => parseTime(
            row[prop],
            format || '{y}-{m}-{d} {h}:{i}:{s}'
          )
        }
        return item
      })
    }
  },
  watch: {
    radioRow(val) {
      let row
      if (val) {
        row = this.data.find(v => v[this.idKey] === val)
      }
      this.$emit('handleRadioChange', row)
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    handleRowClick(val) {
      this.$emit('handleRowClick', val)
      if (this.highlight) {
        this.$store.dispatch('baseData/setHighlight', val)
      }
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
