<template>
  <div class>
    <ul class="archives">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <div class="line" />
        <div class="point" />
        <nuxt-link :to="`/archives/${post.id}`">
          <h4 class="title">
            {{ post.title }}
          </h4>
          <div class="time">
            {{ post.releaseDate | parseTime('{y}-{m}-{d}') }}
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import PageButtons from '@/components/PageButtons'
export default {
  async asyncData ({ $axios }) {
    const { data: res } = await $axios.$post('/graphql', {
      query: `
query {
  postsConnection(sort: "releaseDate:desc", limit: 999, start: 0, where: { show: true }) {
    values {
      id
      title
      releaseDate
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
  },
  head: {
    title: '归档 - 严俊东博客'
  }
}
</script>
<style lang="scss" scoped>
.archives {
  padding: 20px 10px 20px 10px;

  li.post-item {
    position: relative;
    display: block;
    padding-left: 30px;
    line-height: 1.6;
    padding-bottom: 15px;

    .line {
      position: absolute;
      left: 4px;
      height: 100%;
      border-left: 2px solid #e4e7ed;
    }

    &:last-child {
      .line {
        display: none;
      }
    }

    .point {
      position: absolute;
      left: -1px;
      width: 12px;
      height: 12px;
      background-color: #e4e7ed;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    a {
      text-decoration: none;
      color: #303133;

      &:hover {
        color: #93c;
      }
    }

    h4.title {
      font-weight: normal;
      font-size: 1rem;
    }

    div.time {
      color: #909399;
    }
  }
}
</style>
