import { tagListAll } from '@/api/tag'

const fetchEnumFun = {
  tags({ commit }) {
    return tagListAll().then(data => {
      commit('SET_ENUM', { key: 'tags', values: data.map(v => ({ label: v.name, value: v.id })) })
    })
  }
}

const state = {
  enumMap: {
    tags: []
  }
}

const mutations = {
  SET_ENUM: (state, options) => {
    const { key, values } = options
    state.enumMap[key] = values
  }
}

const actions = {
  async setEnum({ commit, state }, { key, values = [], init = false } = {}) {
    if (!key) return
    if (values && values.length) {
      commit('SET_ENUM', { key, values })
    }
    if (init && state.enumMap[key] && state.enumMap[key].length) { // 初始化，如果有值 不做处理
      return
    }
    // 如果有异步获取枚举方法，则调用
    if (fetchEnumFun[key]) {
      return fetchEnumFun[key]({ commit, state })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
