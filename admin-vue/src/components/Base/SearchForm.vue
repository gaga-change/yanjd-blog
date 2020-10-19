<template>
  <div>
    <el-card
      class="simpleCard"
      shadow="hover"
      body-style="padding:12px"
    >
      <el-form
        ref="searchForm"
        :model="searchForms"
        :rules="searchRules"
        :label-width="labelWidth+'px'"
        :inline="true"
      >
        <el-form-item
          v-for="(item,index) in [...config]"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : undefined"
        >
          <template v-if="item.type === 'enum' && typeof item.enum === 'object'">
            <el-select
              v-model="searchForms[item.prop]"
              clearable
              :placeholder="`请选择${item.label}`"
              size="mini"
              @change="hanldeSubmit"
            >
              <el-option
                v-for="(v, i) in item.enum"
                :key="i"
                :label="v"
                :value="v + ''"
              />
            </el-select>
          </template>
          <template v-else-if="item.type === 'enum'">
            <el-select
              v-model="searchForms[item.prop]"
              clearable
              :placeholder="`请选择${item.label}`"
              size="mini"
              @change="hanldeSubmit"
            >
              <el-option
                v-for="(v, i) in mapConfig[item.enum]"
                :key="i"
                :label="v.name"
                :value="v.value"
              />
            </el-select>
          </template>
          <template v-else-if="item.type === 'radio'">
            <el-radio-group v-model="searchForms[item.prop]">
              <el-radio
                v-for="v in mapConfig[item.radio]"
                :key="v.value"
                :label="v.value"
              >{{ v.name }}</el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.type === 'timeArea'">
            <el-date-picker
              v-model="searchForms[item.prop]"
              size="mini"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            />
          </template>
          <template v-else-if="item.type === 'date'">
            <el-date-picker
              v-model="searchForms[item.prop]"
              style="width:178px;"
              placeholder="请选择"
              :type="item.dateType"
              :value-format="item.valueFormat"
              :format="item.format"
            />
          </template>
          <template v-else>
            <el-input
              v-model="searchForms[item.prop]"
              style="width:178px;"
              type="text"
              size="mini"
              :placeholder="`请输入${item.label}`"
            />
          </template>
        </el-form-item>
        <el-form-item :style="btnInline ? '' : 'display: block'">
          <el-button
            size="mini"
            type="primary"
            :disabled="resetLoading"
            :loading="submitLoading"
            @click="hanldeSubmit"
          >查询</el-button>
          <el-button
            size="mini"
            type="primary"
            :disabled="submitLoading"
            :loading="resetLoading"
            @click="hanldeResetForm"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchForm',
  props: {
    config: {
      type: Array,
      default: () => []
    },
    /** 搜索 label宽度 */
    labelWidth: {
      type: Number,
      default: 80
    },
    /** 搜索按钮 是否和输入框在同一行 */
    btnInline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lastFa: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      getInventorySiteLoading: false,
      resetLoading: false,
      submitLoading: false,
      searchForms: {},
      searchRules: {},
      warehouseArea: [],
      warehouseSpace: [],
      spanMap: {
        'timeArea': 16
      },
      batchRule: []
    }
  },
  computed: {
    inputItems() {
      return this.config.filter(v => !v.type)
    },
    configRange() {
      return this.config.filter(v => v.props)
    },
    ...mapGetters([
      'chooseWarehouse',
      'mapConfig'
    ])
  },
  watch: {
    config(val) {
      this.bindKeys()
    }
  },
  created() {
    this.bindKeys()
  },
  methods: {
    bindKeys() {
      const query = this.$route.query
      this.config.forEach(v => {
        if (v.default !== undefined && v.default !== null) {
          this.$set(this.searchForms, v.prop, v.default)
        } else {
          this.$set(this.searchForms, v.prop, undefined)
        }
        if (query[v.prop] !== undefined && query[v.prop] !== null) {
          let temp = query[v.prop]
          if (/^\d+$/.test(temp)) {
            temp = Number(temp)
          }
          this.$set(this.searchForms, v.prop, temp)
        }
      })
    },
    hanldeSubmit() {
      this.submitLoading = true
      const searchForms = { ...this.searchForms }
      // 获取需要解析的字段, 针对 范围型数据
      if (this.configRange.length) {
        this.configRange.forEach(({ prop, props }) => {
          const valArr = searchForms[prop]
          delete searchForms[prop]
          if (valArr && valArr.length === 2) {
            searchForms[props[0]] = new Date(valArr[0]).getTime()
            searchForms[props[1]] = new Date(valArr[1]).getTime()
          }
        })
      }
      this.$emit('search', this.paramsTrim(searchForms), () => {
        this.submitLoading = false
      })
    },
    hanldeResetForm() {
      this.resetLoading = true
      this.$refs['searchForm'].resetFields()
      this.config.forEach(v => {
        this.$set(this.searchForms, v.prop, undefined)
      })
      this.batchRule = []
      this.$nextTick(() => {
        this.$emit('search', this.paramsTrim(this.searchForms), () => {
          this.resetLoading = false
        })
      })
    },
    /** 对字符串进行 去空格操作 */
    paramsTrim(form) {
      const temp = { ...form }
      Object.keys(temp).forEach(key => {
        const val = temp[key]
        if (typeof val === 'string') {
          temp[key] = temp[key].trim()
        }
      })
      return temp
    }
  }
}
</script>
