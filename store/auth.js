import { DB } from '@/plugins/firebase'
export const state = () => ({
  uid: null,
  name: null,
  nickName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
  isLogin: false
})

export const actions = {
  async saveUserInfo ({ commit }, user) {
    const db = await DB.ref(`users/${user.uid}`)
    const fetch = await db.once('value')
    const data = {
      uid: user.uid,
      name: user.displayName,
      nickName: fetch.val().nickName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      isLogin: true
    }
    db
      .set(
        { ...data },
        (error) => {
          if (!error) {
          }
        })
    commit('SAVE_USER_INFO', data)
  },
  updateUserNickname ({ commit }, nickName) {
    commit('UPDATE_USER_NICKNAME', nickName)
  }
}

export const mutations = {
  SAVE_USER_INFO (state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  },
  UPDATE_USER_NICKNAME (state, payload) {
    state.nickName = payload
  }
}

// export const getters = () => ({
// })
