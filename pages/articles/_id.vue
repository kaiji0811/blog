<template>
  <div>
    <div>
      <h1>
        {{ article.title }}
      </h1>
      <p class="lead">
        <small>
          {{ article.created }} Written by {{ article.name }}
        </small>
      </p>
    </div>
    <div>
      <div class="jumbotron my-5 text-center">
        <b-img :src="article.thumb" fluid />
      </div>
      <div v-html="$md.render(article.content)" />
    </div>
  </div>
</template>

<script>
export default {
  middleware: [
    'getArticles'
  ],
  data () {
    return {
    }
  },
  computed: {
    article () {
      return this.$store.getters['articles/getArticle'](this.$route.params.id)
    }
  }
}
</script>

<style></style>
