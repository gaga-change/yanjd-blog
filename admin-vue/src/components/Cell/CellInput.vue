<template>
  <span class="CellInput" @click="handleEdit" @keyup.enter="handleBlur">
    <template v-if="edit">
      <el-input ref="input" v-model="value" @blur="handleBlur" />
    </template>
    <template v-else>
      <span>{{ show }}</span>
    </template>
  </span>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      required: true
    },
    prop: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      edit: false,
      value: ''
    }
  },
  computed: {
    show() {
      return this.row[this.prop]
    }
  },
  methods: {
    handleEdit() {
      this.edit = true
      this.value = this.show
      this.$nextTick(() => {
        console.log(this.$refs['input'])
        this.$refs['input'].focus()
      })
    },
    handleBlur() {
      if (!this.edit) return
      this.edit = false
      this.$emit('handleEditCell', { prop: this.prop, value: this.value, row: this.row })
      this.value = ''
    }
  }
}
</script>
