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
      <div class="my-5 text-center">
        <b-img :src="article.thumb" fluid />
      </div>
      <div class="article line-numbers" v-html="$md.render(`${article.content}`)" />
    </div>
  </div>
</template>

<script>
import Prism from '@/plugins/prism'
export default {
  middleware: [
    'getArticles'
  ],
  data () {
    return {
    }
  },
  mounted() {
    Prism.highlightAll()
  },
  computed: {
    article () {
      return this.$store.getters['articles/getArticle'](this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
.article {
  p {
    font-size: 20px;
  }
}
</style>
