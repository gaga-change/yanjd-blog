<template>
  <div class="">
    <div>
      <div>
        123 {{ $store.state.counter }}
      </div>
      <div v-for="post in posts" :key="post.id">
        <div>
          {{ post.title }}
          <nuxt-link :to="`/archives/${post.id}`">
            详情
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $strapi }) {
    const res = await $strapi.graphql({
      query: `
query {
  postsConnection(limit: 999, start: 0, where: { show: true }) {
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
      posts: postsConnection.values
    }
  },
  data () {
    return {
      posts: []
    }
  }
}
</script>
