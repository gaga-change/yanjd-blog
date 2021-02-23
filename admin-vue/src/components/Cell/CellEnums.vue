<template>
  <span>
    <template v-if="!loading">
      <el-tag v-for="temp in objArr || []" :key="temp.id" type="primary" class="mr5">
        {{ temp.name }}
      </el-tag>
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
    objArr() {
      if (this.loading) {
        return []
      } else {
        const ids = this.row[this.prop]
        console.log(this.prop, JSON.stringify(this.row))
        if (ids && ids.length) {
          return ids.map(id => {
            const temp = this.enumArr.find(v => id === v.value)
            if (temp) {
              return {
                name: temp.label,
                id: temp.value
              }
            } else {
              return {
                name: id,
                id
              }
            }
          }).filter(v => v)
        } else {
          return []
        }
      }
    },
    enumArr() {
      return this.$store.state.enumMap[this.enumKey] || []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      this.$store.dispatch('enumMap/setEnum', { key: this.enumKey, init: true }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>
