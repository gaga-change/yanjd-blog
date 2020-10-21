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
  async asyncData ({ params, $api }) {
    const { data: res } = await $api.postList(0, 10, { tags: params.id }, { fetchTag: true })
    const { postsConnection, tag } = res
    return {
      posts: postsConnection.values,
      total: postsConnection.aggregate.count,
      id: params.id,
      tag
    }
  },
  data () {
    return {
      posts: [],
      total: 0,
      id: '',
      tag: {}
    }
  },
  computed: {
    noMore () {
      return this.posts.length === this.total
    }
  },
  methods: {
    async handleLoadMore (cb) {
      const { data: res } = await this.$api.postList(this.posts.length, 10, { tags: this.id }, { fetchTag: true })
      const { postsConnection } = res
      this.total = postsConnection.aggregate.count
      this.posts.push(...postsConnection.values)
      cb()
    }
  },
  head () {
    return {
      title: `${this.tag.name} - 标签 - 严俊东博客`
    }
  }
}
</script>
