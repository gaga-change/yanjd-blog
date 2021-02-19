<template>
  <span>
    <template v-if="!loading">
      {{ showText }}
    </template>
    <template v-else>
      <i class="el-icon-loading" />
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
    enumKey: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    enumOptions() {
      if (this.enumKey) {
        return this.$store.state.enumMap[this.enumKey]
      } else {
        return this.aEnum
      }
    },
    showText() {
      if (this.loading) {
        return ''
      } else {
        const temp = this.enumOptions.find(v => v.value === this.row[this.prop])
        if (temp) {
          return temp.label
        } else {
          return ''
        }
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.enumKey) {
        this.loading = true
        this.$store.dispatch('enumMap/setEnum', { key: this.enumKey, init: true }).finally(_ => {
          this.loading = false
        })
      }
    }
  }
}
</script>
