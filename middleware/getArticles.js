export default async function ({ store }) {
  await store.dispatch('articles/saveArticles')
}
