<template>
  <div>
    <el-form
      ref="form"
      :inline="inline"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <template>
        <!-- 下拉框 -->
        <el-form-item
          v-for="(item, index) in config"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <MapSelect
            v-if="item.type === 'enum'"
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            :enum-name="item.enum"
            :multiple="item.multiple || false"
          />
          <!-- 多行文本框 -->
          <el-input
            v-else-if="item.type === 'textarea'"
            v-model="formData[item.prop]"
            style="width:200px;"
            type="textarea"
            :placeholder="`请输入${item.label}`"
            maxlength="30"
            show-word-limit
            :disabled="item.disabled"
          />
          <!-- 数字框 -->
          <el-input-number
            v-else-if="item.type === 'number'"
            v-model="formData[item.prop]"
            style="width:200px;"
            placeholder="请输入"
            :precision="item.precision || 0"
            :min="item.min || 0"
            :max="item.max || 99999999"
            :disabled="item.disabled"
            controls-position="right"
          />
          <!-- 开关 -->
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="formData[item.prop]"
            :active-value="1"
            :inactive-value="0"
            :disabled="item.disabled"
          />
          <el-radio-group
            v-else-if="item.type === 'radio'"
            v-model="formData[item.prop]"
            :disabled="item.disabled"
          >
            <el-radio
              v-for="v in mapConfig[item.enum]"
              :key="v.value"
              :label="v.value"
            >{{ v.name }}
            </el-radio>
          </el-radio-group>
          <el-time-picker
            v-else-if="item.type === 'timePicker'"
            v-model="formData[item.prop]"
            style="width: 200px"
            :format="item.format || 'HH:mm'"
            :placeholder="`请选择${item.label}`"
          />
          <el-date-picker
            v-else-if="item.type === 'datePicker'"
            v-model="formData[item.prop]"
            style="width: 200px"
            type="date"
            placeholder="选择日期"
            :picker-options="item.pickerOptions || {}"
          />
          <el-select
            v-else-if="item.type === 'select'"
            v-model="formData[item.prop]"
            style="width: 200px"
            filterable
            clearable
            placeholder="请输入关键词"
            :loading="item.loading"
            @focus="() => item.focus(formData)"
          >
            <el-option
              v-for="v in item.list"
              :key="v.value"
              :label="v.label"
              :value="v.value"
            />
          </el-select>
          <el-select
            v-else-if="item.type === 'selectRemote'"
            v-model="formData[item.prop]"
            style="width: 200px"
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="请输入关键词"
            :remote-method="item.remoteMethod"
            :loading="item.loading"
            @change="v=> handleChange(v, item)"
          >
            <el-option
              v-for="v in item.list"
              :key="v.value"
              :label="v.label"
              :value="v.value"
            />
          </el-select>
          <!-- 输入框 -->
          <el-input
            v-else
            v-model="formData[item.prop]"
            style="width:200px;"
            :placeholder="`请输入${item.label}`"
            :disabled="item.disabled"
          />
          <span
            v-if="item.unit"
            class="unit"
          >{{ item.unit }}</span>
        </el-form-item>
      </template>
      <!-- 单选 -->
      <!-- <el-form-item
        label="特殊资源"
        prop="resource"
      >
        <el-radio-group v-model="formData.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// rules: {
//  ... 表单校验
// packageDesc: [
//   { required: true, message: '必填项', trigger: 'blur' },
//   { min: 0, max: 20, message: '不能超过20个字符', trigger: 'blur' },
//   {
//     validator(rule, value, callback) {
//       value > 0 ? callback() : callback('数值必须大于0')
//     },
//     trigger: 'blur'
//   }
// ]
// }
export default {
  name: 'BaseForm',
  props: {
    config: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    ...mapGetters([
      'mapConfig'
    ])
  },
  watch: {
    config() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleChange(v, item) {
      // console.log(item, '??')
      item.change && item.change(v)
    },
    init() {
      const temp = this.$copy(this.formData)
      this.config.forEach(item => {
        temp[item.prop] = item.default
      })
      this.formData = temp
      this.$refs['form'] && this.$refs['form'].clearValidate()
    },
    /** 确定 */
    validate(callback) {
      this.$refs['form'].validate((valid) => {
        const temp = { ...this.formData }
        // Object.keys(temp).forEach(key => {
        //   if (temp[key] === '') {
        //     temp[key] = undefined
        //   }
        // })
        callback(valid, temp)
      })
    },
    resetFields() {
      // this.$nextTick(() => {
      //   Object.keys(this.formData).forEach(key => {
      //     this.formData[key] = undefined
      //   })
      //   this.$refs['form'] && this.$refs['form'].clearValidate()
      // })
    }
  }
}
</script>
