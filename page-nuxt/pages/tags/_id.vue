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
  async asyncData ({ params, $api, store }) {
    const filter = { tags_contains: params.id }
    const { list, total } = await $api.postList(0, 10, filter)
    const tagName = store.getters.tagsMap.get(params.id)
    return {
      posts: turnPostList(list, store.getters.tagsMap),
      total,
      filter,
      tagName
    }
  },
  data () {
    return {
      posts: [],
      total: 0,
      filter: {},
      tagName: ''
    }
  },
  head () {
    return {
      title: `${this.tagName} - 标签 - 严俊东博客`
    }
  }
}
</script>
