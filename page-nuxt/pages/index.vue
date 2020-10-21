<template>
  <div class>
    <div>
      <PostItem :posts="posts" />
      <LoadMore :no-more="noMore" @loadMore="handleLoadMore" />
    </div>
  </div>
</template>

<script>
import PostItem from '@/components/PostItem'
import LoadMore from '@/components/LoadMore'
export default {
  components: {
    LoadMore,
    PostItem
  },
  async asyncData ({ $api }) {
    const { data: res } = await $api.postList(0, 10)
    const { postsConnection } = res
    return {
      posts: postsConnection.values,
      total: postsConnection.aggregate.count
    }
  },
  data () {
    return {
      posts: [],
      total: 0
    }
  },
  computed: {
    noMore () {
      return this.posts.length === this.total
    }
  },
  methods: {
    async handleLoadMore (cb) {
      const { data: res } = await this.$api.postList(this.posts.length, 10)
      const { postsConnection } = res
      this.total = postsConnection.aggregate.count
      this.posts.push(...postsConnection.values)
      cb()
    }
  },
  head: {
    title: '严俊东博客 - 首页'
  }
}
</script>
