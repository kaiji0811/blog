import { DB } from '@/plugins/firebase'

const initialState = {
  title: '',
  created: '',
  content: ''
}
export const state = () => ({
  items: {}
})

export const actions = {
  saveArticles ({ commit }, payload) {
    DB
      .ref('articles/')
      .on('child_added', (snapshot) => {
        commit('SAVE_ARTICLES', snapshot.val())
      })
  }
}

export const mutations = {
  SAVE_ARTICLES (state, payload) {
    state.items = {
      ...state.items,
      ...payload
    }
  }
}

export const getters = {
  getArticle: (state) => (id) => {
    return !state.items[id]
      ? initialState : state.items[id]
  }
}
