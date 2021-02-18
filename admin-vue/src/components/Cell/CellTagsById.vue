<template>
  <span>
    <template v-if="!loading">
      <el-tag v-for="temp in tagArr || []" :key="temp.id" type="primary" class="mr5">
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
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    tagArr() {
      if (this.loading) {
        return []
      } else {
        const tagIds = this.row.tagIds
        if (tagIds) {
          return tagIds.split(',').map(id => {
            const temp = this.tagsEnum.find(v => id === v.value)
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
    tagsEnum() {
      return this.$store.state.enumMap.enumMap.tags || []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      this.$store.dispatch('enumMap/setEnum', { key: 'tags', init: true }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>
