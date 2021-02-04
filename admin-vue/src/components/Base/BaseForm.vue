<template>
  <el-form :ref="localFormOptions.ref" :inline="localFormOptions.inline" :label-position="localFormOptions.labelPosition" :class="localFormOptions['class']" :label-width="localFormOptions.labelWidth?localFormOptions.labelWidth:'80px'" :model="value" :rules="rules" :style="localFormOptions.style">
    <el-row :gutter="localFormOptions.gutter">
      <slot name="formItem" />
      <el-col
        v-for="(item) in localFormConfig"
        :key="item.prop"
        :span="item.col ? item.col : localFormOptions.col"
      >
        <BaseItem :item="item" :form-data="value" />
      </el-col>
      <el-col v-if="localFormOptions.operates" :span="localFormOptions.operateCol ? localFormOptions.operateCol : localFormOptions.col">
        <el-form-item>
          <!-- button -->
          <el-button
            v-for="(item,index) in localFormOptions.operates"
            :key="item.buttonLabel"
            :type="item.type"
            :size="item.size"
            :disabled="item.disabled"
            :plain="item.plain"
            :icon="item.icon"
            @click.native.prevent="item.method ? item.method(localFormConfig, item, index) : ''"
          >{{ item.buttonLabel }}
          </el-button>
          <slot name="operate" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>

import BaseItem from '@/components/Base/BaseItem'
const optionsDef = () => ({
  inline: false,
  col: 24,
  ref: 'dataForm',
  labelWidth: '120px'
})
export default {
  filters: {
    hint(item) {
      if (item.placeholder) {
        return item.placeholder
      } else {
        if (['input', undefined].includes(item.type)) {
          return '请输入'
        } else if (['aEnum', 'datetime', 'date', 'select'].includes(item.type)) {
          return '请选择'
        }
      }
    }
  },
  components: { BaseItem },
  props: {
    formOptions: {
      type: Object,
      default: optionsDef
    },
    formConfig: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    localFormConfig() {
      return this.formConfig.filter(v => !v.hidden)
    },
    localFormOptions() {
      return {
        ...optionsDef(),
        ...this.formOptions
      }
    }
  },
  mounted() {
  },
  methods: {
    clearValidate(key) {
      this.$refs[this.localFormOptions.ref].clearValidate(key)
    }
  }
}
</script>
<style lang="scss" scope>
.el-form-item__label{
	font-weight: 500;
	padding: 0;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select{
	width: 100%;
}
</style>
