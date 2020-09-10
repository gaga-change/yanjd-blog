// import strapi from '@nuxtjs/strapi'

export const state = () => ({
  tags: [],
  categories: [],
  newPosts: []
})

export const mutations = {
  setTags (state, data) {
    state.tags = data || []
  },
  setCategories (state, data) {
    state.categories = data || []
  },
  setNewPosts (state, data) {
    state.newPosts = data || []
  }
}

export const actions = {
  async INIT_DATA ({ commit }, strapi) {
    const res = await strapi.graphql({
      query: `
query {
  categories {
    name
    id
  }
  tags {
    name
    id
  }
  posts(start: 0, limit: 10, sort: "releaseDate:desc", where: { show: true }) {
    id
    title
  }
}
      `
    })
    commit('setTags', res.tags)
    commit('setCategories', res.categories)
    commit('setNewPosts', res.posts)
    // const { data } = await axios.get('http://my-api/stars')
    // commit('SET_STARS', data)
  }
}
