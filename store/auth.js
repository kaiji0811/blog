import { DB } from '@/plugins/firebase'
export const state = () => ({
  uid: '',
  name: '',
  email: '',
  phoneNumber: '',
  photoURL: '',
  isLogin: false
})

export const actions = {
  saveUserInfo ({ commit }, payload) {
    commit('SAVE_USER_INFO', payload)
  }
}

export const mutations = {
  SAVE_USER_INFO (state, payload) {
    DB
      .ref(`users/${payload.uid}`)
      .set({
        uid: payload.uid,
        name: payload.name,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        photoURL: payload.photoURL
      },
      (error) => {
        if (!error) {
        }
      })
    state.uid = payload.uid
    state.name = payload.name
    state.email = payload.email
    state.phoneNumber = payload.phoneNumber
    state.photoURL = payload.photoURL
    state.isLogin = payload.isLogin
  }
}

// export const getters = () => ({
// })
