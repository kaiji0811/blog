<template>
  <div>
    <b-card v-for="article in articles" :key="article.id"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title>
        <nuxt-link :to="{name: 'articles-id', params: { id: article.title }}">
          {{ article.title }}
        </nuxt-link>
      </b-card-title>
    </b-card>
    <!-- <template v-else>
      <div v-if="!isLogin">
        <h1>こんにちは、ゲストさん！</h1>
        <p class="lead" />
        <div class="btn_login">
          <b-button variant="primary" @click="googleLogin">
            Googleでログイン
          </b-button>
        </div>
      </div>
      <div v-else class="text-center">
        <h1>Hi, {{ name }}!</h1>
        <p class="lead">
          サインインありがとうございます！<br>
          Enjoy your blog life!
        </p>
        <b-link to="members/" router-tag="button" class="btn btn-outline-primary btn-lg">
          Enter
        </b-link>
      </div>
    </template> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Auth, Provider, DB } from '@/plugins/firebase'
export default {
  asyncData() {
    return {
    }
  },
  computed: {
    ...mapState('auth', [
      'name',
      'isLogin'
    ]),
    ...mapState('articles', [
      'articles'
    ])
  },
  mounted() {
    DB
      .ref('articles/')
      .on('child_added', (snapshot) => {
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
