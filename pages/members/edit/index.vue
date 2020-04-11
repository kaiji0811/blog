<template>
  <div>
    <ul>
      <li v-for="article in articles" :key="article.created">
        <nuxt-link :to="{name: 'members-edit-id', params: { id: article.title }, query: { hash: article.id }}">
          <p>{{ article.title }}</p>
          <p>{{ article.content }}</p>
          <p>{{ article.created }}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
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
  mounted () {
    setTimeout(() => {
      const db = firebase
        .database()
        .ref(`notes/${this.uid}/`)
        .once('value')
        .then((snapshot) => {
          this.articles = snapshot.val()
        })
      this.articles = db
    }, 0)
  }
}
</script>

<style>

</style>
