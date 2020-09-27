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
  async asyncData ({ $axios, params }) {
    const { data: res } = await $axios.$post('/graphql', {
      query: `
query {
  category(id: "${params.id}") {
    name
  }
  postsConnection(limit: 10, start: 0, where: { show: true, category: "${params.id}" }) {
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
    const { postsConnection, category } = res
    return {
      posts: postsConnection.values,
      total: postsConnection.aggregate.count,
      id: params.id,
      category
    }
  },
  data () {
    return {
      posts: [],
      total: 0,
      id: '',
      category: {}
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
  postsConnection(limit: 10, start: ${this.posts.length}, where: { show: true, category: "${this.id}" }) {
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
  head () {
    return {
      title: `${this.category.name} - 分类 - 严俊东博客`
    }
  }
}
</script>
