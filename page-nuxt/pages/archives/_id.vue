<template>
  <div>
    <h2>{{ post && post.title }}</h2>
    <div v-if="post.markdown">
      <div v-html="$md.render(post.markdown)" />
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ params, $strapi }) {
    const res = await $strapi.findOne('posts', params.id)
    return {
      id: params.id,
      post: res
    }
  },
  data () {
    return {
      id: null,
      post: null
    }
  },
  async mounted () {
    if (this.id) {
      const res = await this.$strapi.findOne('posts', this.id)
      console.log(res)
    }
  }
}
</script>
