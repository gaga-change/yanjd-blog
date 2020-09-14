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
  async asyncData ({ $strapi, params }) {
    const res = await $strapi.graphql({
      query: `
query {
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
    const { postsConnection } = res
    return {
      posts: postsConnection.values,
      total: postsConnection.aggregate.count,
      id: params.id
    }
  },
  data () {
    return {
      posts: [],
      total: 0,
      id: ''
    }
  },
  computed: {
    noMore () {
      return this.posts.length === this.total
    }
  },
  methods: {
    async handleLoadMore (cb) {
      const res = await this.$strapi.graphql({
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
  }
}
</script>
