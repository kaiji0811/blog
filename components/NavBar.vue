<template>
  <div>
    <b-navbar class="d-flex justify-content-between border-bottom">
      <b-navbar-brand to="/">
        くろねこてっく
      </b-navbar-brand>
      <b-button v-b-toggle.sidemenu variant="light">
        Menu
      </b-button>
    </b-navbar>
    <b-sidebar id="sidemenu" title="くろねこてっく">
      <div class="px-3 py-2">
        <b-nav vertical>
          <template v-if="isLogin">
            <b-nav-item link-classes="text-dark" to="/members">
              ダッシュボード
            </b-nav-item>
            <b-nav-item link-classes="text-dark" to="/members/create">
              記事を作成する
            </b-nav-item>
            <b-nav-item link-classes="text-dark" to="/members/edit">
              記事を編集する
            </b-nav-item>
            <b-nav-item link-classes="text-dark" to="/members/profile">
              プロフィール
            </b-nav-item>
            <b-nav-item link-classes="text-dark" @click="logOut">
              サインアウト
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item link-classes="text-dark" @click="googleLogin">
              サインイン
            </b-nav-item>
          </template>
        </b-nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Auth, Provider } from '@/plugins/firebase'

export default {
  computed: {
    ...mapGetters('auth', [
      'isLogin'
    ])
  },
  methods: {
    ...mapActions('auth', [
      'deleteUserInfo'
    ]),
    googleLogin() {
      Auth.signInWithRedirect(Provider.google()).then((result) => {
        this.$router.push('/members')
      })
    },
    logOut() {
      this.deleteUserInfo()
      Auth.signOut()
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
