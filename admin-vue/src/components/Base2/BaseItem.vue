<template>
  <el-form-item v-show="!item.hidden" class="BaseItemComponent" :label-width="item.labelWidth" :label="localLabel" :prop="item.prop">
    <component
      :is="dom"
      v-model="faNode[nodeKey]"
      v-bind="item"
      :form-data="formData"
      v-on="item.listener"
    />
  </el-form-item>
</template>

<script>
import InputPro from '@/components/Base2/InputPro'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    dom() {
      if (this.item.type === 'dom') {
        return this.item.dom
      }
      return InputPro
    },
    localLabel() {
      return this.item.label ? (this.item.label + '：') : ''
    },
    hint() {
      const item = this.item
      if (this.placeholder) {
        return this.placeholder
      }
      if (item.placeholder) {
        return item.placeholder
      } else {
        if (['input', undefined].includes(item.type)) {
          return '请输入'
        } else if (['aEnum', 'datetime', 'date', 'select'].includes(item.type)) {
          return '请选择'
        }
      }
      return undefined
    },
    // 获取对象父节点  例如：prop='a.b.c',父对象则是 formData.a.b
    faNode() {
      const prop = this.item.prop
      const keys = prop.split('.')
      keys.pop()
      let res = this.formData
      keys.forEach(key => {
        res = res[key]
      })
      return res
    },
    nodeKey() {
      const prop = this.item.prop
      return prop.split('.').pop()
    }
  }
}
</script>

<style lang="scss" scoped>
  .BaseItemComponent {
    ::v-deep .el-input.el-input--mini {
      height: 28px;
    }
  }
</style>
