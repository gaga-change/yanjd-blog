export const state = () => ({
  tags: [],
  categories: [],
  notPosts: []
})

export const getters = {
  tagsMap: (state) => {
    const map = new Map()
    state.tags.forEach((item) => {
      map.set(item.id, item.name)
    })
    return map
  },
  categoriesMap: (state) => {
    const map = new Map()
    state.categories.forEach((item) => {
      map.set(item.id, item.name)
    })
    return map
  }
}

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
  }
}
