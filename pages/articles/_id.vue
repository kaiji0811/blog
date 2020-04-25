<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>
        {{ title }}
      </h1>
      <p class="lead">
        <small>
          {{ created }}
        </small>
      </p>
    </div>
    <div class="mt-5">
      <div v-html="$md.render(content)" />
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
    },
    title () {
      return this.article.title
    },
    created () {
      return this.article.created
    },
    content () {
      return this.article.content
    }
  }
}
</script>

<style></style>
