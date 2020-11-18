<template>
  <div>
    <ul v-if="articles">
      <li v-for="article in articles" :key="article.created">
        <nuxt-link :to="{name: 'members-edit-id', params: { id: article.title }}">
          <p>{{ article.title }}</p>
          <p>{{ article.content }}</p>
          <p>{{ article.created }}</p>
        </nuxt-link>
      </li>
    </ul>
    <div v-else>
      <p>
        まだ記事はありません。
      </p>
      <p>
        <b-button variant="primary" to="/members/create">
          記事を作成する
        </b-button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DB } from '@/plugins/firebase'

export default {
  middleware: 'authentication',
  data () {
    return {
      articles: {}
    }
  },
  computed: {
    ...mapState('auth', {
      uid: 'uid'
    })
  },
  created () {
    DB
      .ref(`articles/${this.uid}/`)
      .once('value')
      .then((snapshot) => {
        this.articles = snapshot.val()
      })
  }
}
</script>

<style>

</style>
