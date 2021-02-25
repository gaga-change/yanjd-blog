import { tagListAll } from '@/api/tag'
import { categoryListAll } from '@/api/category'
import { roleListAll } from '@/api/role'
import { permissionListAll } from '@/api/permission'

const fetchEnumFun = {
  tags({ commit }) {
    return tagListAll().then(data => {
      commit('SET_ENUM', { key: 'tags', values: data.map(v => ({ label: v.name, value: v.id })) })
    })
  },
  categories({ commit }) {
    return categoryListAll().then(data => {
      commit('SET_ENUM', { key: 'categories', values: data.map(v => ({ label: v.name, value: v.id })) })
    })
  },
  roles({ commit }) {
    return roleListAll().then(data => {
      commit('SET_ENUM', { key: 'roles', values: data.map(v => ({ label: v.name, value: v.id })) })
    })
  },
  permissions({ commit }) {
    return permissionListAll().then(data => {
      commit('SET_ENUM', { key: 'permissions', values: data.map(v => ({ label: v.name, value: v.id })) })
    })
  }
}

const state = {
  tags: [],
  categories: [],
  roles: [],
  permissions: [],
  postStatus: [{ label: '草稿', value: 0 }, { label: '已发布', value: 1 }]
}

const mutations = {
  SET_ENUM: (state, options) => {
    const { key, values } = options
    state[key] = values
  }
}

const actions = {
  /**
   *  设置全局字典
   */
  async setEnum({ commit, state }, { key, values = [], init = false } = {}) {
    if (!key) return
    if (values && values.length) {
      commit('SET_ENUM', { key, values })
    }
    if (init && state[key] && state[key].length) { // 初始化，如果有值 不做处理
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
