<template>
  <div>
    <!-- <button v-if="loading">
      加载中...
    </button>
    <button v-if="noMore">
      没有更多了....
    </button> -->
  </div>
</template>

<script>
export default {
  props: {
    noMore: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    window.onscroll = () => {
    // 变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight > scrollHeight - 60 && !this.loading && !this.noMore) {
        this.loading = true
        this.$emit('loadMore', () => {
          this.loading = false
        })
      }
    }
  }
}
</script>
