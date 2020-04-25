<template>
  <div>
    <b-navbar type="dark" variant="dark" class="d-flex justify-content-between">
      <b-navbar-brand to="/">
        Mustle Angular's Blog
      </b-navbar-brand>
      <b-button v-b-toggle.sidemenu variant="light">
        Menu
      </b-button>
    </b-navbar>
    <b-sidebar id="sidemenu" title="Mustle Angular's Blog" bg-variant="dark" text-variant="light">
      <div class="px-3 py-2">
        <b-nav vertical>
          <template v-if="isLogin">
            <b-nav-item link-classes="text-light" to="/members">
              ダッシュボード
            </b-nav-item>
            <b-nav-item link-classes="text-light" to="/members/create">
              記事を作成する
            </b-nav-item>
            <b-nav-item link-classes="text-light" to="/members/edit">
              記事を編集する
            </b-nav-item>
            <b-nav-item link-classes="text-light" @click="logOut">
              サインアウト
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item link-classes="text-light" @click="googleLogin">
              サインイン
            </b-nav-item>
          </template>
        </b-nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Auth, Provider } from '@/plugins/firebase'

export default {
  computed: {
    ...mapState('auth', [
      'isLogin'
    ])
  },
  mounted () {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        this.saveUserInfo({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber ? user.phoneNumber : '',
          photoURL: user.photoURL,
          isLogin: true
        })
      }
    })
  },
  methods: {
    ...mapActions('auth', {
      saveUserInfo: 'saveUserInfo'
    }),
    googleLogin() {
      Auth.signInWithRedirect(Provider.google()).then((result) => {
        this.$router.push('/members')
      })
    },
    logOut() {
      Auth.signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
