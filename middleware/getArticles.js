export default async function ({ store }) {
  console.log('middleware kicked')
  await store.dispatch('articles/saveArticles')
}
