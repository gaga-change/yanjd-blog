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
  async nuxtServerInit ({ commit }, { $api }) {
    const { data: res } = await $api.initDataGql()
    commit('setTags', res.tags)
    commit('setCategories', res.categories)
    commit('setnotPosts', res.posts)
    // const { data } = await axios.get('http://my-api/stars')
    // commit('SET_STARS', data)
  }
}
