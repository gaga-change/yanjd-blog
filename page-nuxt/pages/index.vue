<template>
  <div class>
    <PostList ref="PostList" :total.sync="total" :posts.sync="posts" :filter="filter" />
  </div>
</template>

<script>
import PostList from '~/components/PostList'
import { turnPostList } from '~/utils/turnPostList'

export default {
  components: {
    PostList
  },
  async asyncData ({ $api, store }) {
    const filter = {}
    const { list, total } = await $api.postList(0, 10, filter)
    return {
      posts: turnPostList(list, store.getters.tagsMap),
      total,
      filter
    }
  },
  data () {
    return {
      posts: [],
      total: 0,
      filter: {}
    }
  },
  head: {
    title: '严俊东博客 - 首页'
  }
}
</script>
