export const state = () => ({
  tags: [],
  categories: [],
  notPosts: []
})

export const mutations = {
  setTags (state, data) {
    state.tags = data || []
  },
  setCategories (state, data) {
    state.categories = data || []
  },
  setnotPosts (state, data) {
    state.notPosts = data || []
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { $axios }) {
    const { data: res } = await $axios.$post('/graphql', {
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
  posts(start: 0, limit: 10, sort: "readTime:desc", where: { show: true }) {
    id
    title
  }
}
      `
    })
    commit('setTags', res.tags)
    commit('setCategories', res.categories)
    commit('setnotPosts', res.posts)
    // const { data } = await axios.get('http://my-api/stars')
    // commit('SET_STARS', data)
  }
}
