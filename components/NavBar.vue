<template>
  <div>
    <b-navbar toggleable="lg" class="d-block d-lg-none flex-column" type="dark" variant="dark">
      <b-navbar-brand to="/">
        Blog Manager
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLogin" href="#">
            Login
          </b-nav-item>
          <b-nav-item v-else href="#" @click="logOut()">
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-sidebar id="sidebar-1" no-header-close class="d-none d-lg-block" title="Blog Manager" bg-variant="dark" text-variant="light">
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
import firebase from '@/plugins/firebase'

export default {
  computed: {
    ...mapState('auth', [
      'isLogin'
    ])
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.saveUserInfo({
          uid: user.uid,
          name: user.displayName,
          isLogin: true
        })
      } else {
        this.saveUserInfo({
          uid: '',
          name: '',
          isLogin: false
        })
      }
    })
  },
  methods: {
    ...mapActions('auth', {
      saveUserInfo: 'saveUserInfo'
    }),
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        this.$router.push('/members')
      })
    },
    logOut() {
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
