import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_IS_AUTHORIZATION: 'SET_IS_AUTHORIZATION', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
}

const state = {
  isAuthorization: false,
  user: {}
}

const getters = {
  isAuthorization: state => state.isAuthorization,
  user: state => state.user
}

const mutations = {
  [types.SET_IS_AUTHORIZATION](state, isAuthorization) {
    state.isAuthorization = (isAuthorization ? true : false)
  },

  [types.SET_USER](state, user) {
    state.user = (user ? user : {})
  }
}

const actions = {
  setAuthorization: ({ commit }, isAuthorization) => {
    commit(types.SET_IS_AUTHORIZATION, isAuthorization)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearAuthorization: ({ commit }) => {
    commit(types.SET_IS_AUTHORIZATION, false)
    commit(types.SET_USER, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
