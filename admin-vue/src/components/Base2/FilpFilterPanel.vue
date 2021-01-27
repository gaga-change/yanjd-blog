<template>
  <div class="FilpFilterPanelComponent">
    <el-form ref="form" :model="value" :inline="false" label-width="100px" :rules="searchRules">
      <el-row class="search" :gutter="4">
        <slot name="formItem" />
        <el-col
          v-for="(item, index) in searchConfigSelf"
          v-show="!searchOptionsSelf.filpSupport || filp || index < 3"
          :key="item.prop"
          class="search-col"
          :span="colSpan"
        >
          <BaseItem :item="item" :form-data="value" />
        </el-col>
        <!-- -->
        <el-col :span="(24 - (searchConfigSelf.length * colSpan % 24)) || 24" class="btn-area">
          <i
            v-if="searchOptionsSelf.filpSupport"
            class="el-icon-d-arrow-left pointer"
            :class="filp ? 'up' : 'down'"
            @click="filp = !filp"
          />
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          <slot name="operate" />
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>
<script lang="jsx">
import BaseItem from '@/components/Base2/BaseItem'
import { deepClone } from '@/utils'

const optionsDef = () => ({
  filpSupport: false,
  reactiveCol: true // 是否启用响应式，动态布局
})

export default {
  filters: {
    hint(item) {
      if (item.placeholder) {
        return item.placeholder
      } else {
        if (['input', undefined].includes(item.type)) {
          return '请输入'
        } else if (['aEnum'].includes(item.type)) {
          return '全部'
        } else if (['datetime', 'date', 'select'].includes(item.type)) {
          return '请选择'
        }
      }
    }
  },
  components: { BaseItem },
  props: {
    searchRules: {
      type: Object,
      default: () => ({})
    },
    searchConfig: {
      type: Array,
      default: () => []
    },
    searchOptions: {
      type: Object,
      default: optionsDef
    },
    value: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      filp: false
    }
  },
  computed: {
    searchConfigSelf() {
      return this.searchConfig.filter(v => v.label)
    },
    searchOptionsSelf() {
      return Object.assign(optionsDef(), deepClone(this.searchOptions))
    },
    clientWidth() {
      return this.$store.state.app.clientWidth
    },
    colSpan() {
      if (!this.searchOptionsSelf.reactiveCol) {
        return -1
      }
      if (this.clientWidth > 930) {
        return 6
      } else if (this.clientWidth > 600) {
        return 12
      } else {
        return 24
      }
    }
  },
  methods: {
    handleSearch() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('search')
        }
      })
    },
    handleReset() {
      this.$refs['form'].clearValidate()
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss">
  .FilpFilterPanelComponent {
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: auto;
    }
  }
</style>
<style lang="scss" scoped>
  .search-col {
    transition: all .3s;
  }
  .text-right {
    text-align: right;
  }

  .search {
    padding: 0;

    /*.el-col-6 {*/
    /*  display: flex;*/
    /*  align-items: center;*/
    /*  padding-top: 15px;*/
    /*}*/

    .btn-area {
      padding-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    i {
      width: 100px;
      text-align: center;
      font-size: 18px;
      color: blue;
    }

    .up {
      transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
    }

    .down {
      transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -webkit-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
    }
  }
</style>

