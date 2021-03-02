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
    const filter = { category: params.id }
    const { list, total } = await $api.postList(0, 10, filter)
    const categoryName = store.getters.categoriesMap.get(params.id)
    return {
      posts: turnPostList(list, store.getters.tagsMap),
      total,
      filter,
      categoryName
    }
  },
  data () {
    return {
      posts: [],
      total: 0,
      filter: {},
      categoryName: ''
    }
  },
  head () {
    return {
      title: `${this.categoryName} - 分类 - 严俊东博客`
    }
  }
}
</script>
