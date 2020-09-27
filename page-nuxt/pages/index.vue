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
  async asyncData ({ $axios }) {
    const { data: res } = await $axios.$post('/graphql', {
      query: `
query {
  postsConnection(limit: 10, start: 0, where: { show: true }, sort: "releaseDate:desc") {
    aggregate {
      count
    }
    values {
      id
      title
      releaseDate
      readTime
      intro
      tags(start: 0) {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
}
      `
    })
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
      const { data: res } = await this.$axios.$post('/graphql', {
        query: `
query {
  postsConnection(limit: 10, start: ${this.posts.length}, where: { show: true }, sort: "releaseDate:desc") {
    aggregate {
      count
    }
    values {
      id
      title
      releaseDate
      readTime
      intro
      tags(start: 0) {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
}
      `
      })
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
