export const state = () => ({
  uid: '',
  name: '',
  isLogin: false
})

export const actions = {
  saveUserInfo ({ commit }, payload) {
    commit('SAVE_USER_INFO', payload)
  }
}

export const mutations = {
  SAVE_USER_INFO (state, payload) {
    state.uid = payload.uid
    state.name = payload.name
    state.isLogin = payload.isLogin
  }
}

// export const getters = () => ({
// })
