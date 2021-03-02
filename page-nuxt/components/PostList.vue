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
import { turnPostList } from '~/utils/turnPostList'

export default {
  components: {
    LoadMore,
    PostItem
  },
  props: {
    posts: {
      type: Array,
      default: Array
    },
    total: {
      type: Number,
      default: 0
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    noMore () {
      return this.posts.length >= this.total
    }
  },
  methods: {
    async handleLoadMore (cb) {
      const { list, total } = await this.$api.postList(this.posts.length, 10)
      this.$emit('total:update', total)
      this.posts.push(...turnPostList(list, this.$store.getters.tagsMap))
      cb()
    }
  }
}
</script>
