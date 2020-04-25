<template>
  <div>
    <b-link
      v-for="item in sortedItemsByCreated"
      :key="item.id"
      :to="{name: 'articles-id', params: { id: item.title }}"
      router-tag="div"
    >
      <b-card tag="article" :img-src="item.thumb" style="max-width: 20rem;" class="mb-2">
        <b-card-title>{{ item.title }}</b-card-title>
      </b-card>
    </b-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Auth, Provider, DB } from '@/plugins/firebase'
export default {
  middleware: 'getArticles',
  computed: {
    ...mapState('auth', ['name', 'isLogin']),
    ...mapState('articles', ['items']),
    sortedItemsByCreated() {
      return Object.entries(this.items)
        .map(([key, value]) => ({
          ...value
        }))
        .sort((a, b) => {
          return a.created > b.created ? -1 : a.created < b.created ? 1 : 0
        })
    }
  },
  mounted() {
    DB.ref('articles/').on('child_added', snapshot => {
      this.saveArticles(snapshot.val())
    })
  },
  methods: {
    ...mapActions('auth', {
      saveUserInfo: 'saveUserInfo'
    }),
    ...mapActions('articles', {
      saveArticles: 'saveArticles'
    }),
    googleLogin() {
      Auth.signInWithRedirect(Provider.google())
    },
    logOut() {
      Auth.signOut()
    }
  }
}
</script>

<style></style>
