export const state = () => ({
  articles: {}
})

export const actions = {
  saveArticles ({ commit }, payload) {
    commit('SAVE_ARTICLES', payload)
  }
}

export const mutations = {
  SAVE_ARTICLES (state, payload) {
    state.articles = {
      ...state.articles,
      ...payload
    }
  }
}

export const getters = {
  getArticle: (state) => (id) => {
    return state.articles[id]
  }
}
