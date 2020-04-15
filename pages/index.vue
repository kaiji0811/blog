<template>
  <div>
    <div v-if="isWaiting" class="log_wait">
      <div class="text-center">
        <b-spinner label="Spinning" />
      </div>
    </div>
    <template v-else>
      <div v-if="!isLogin">
        <h1>こんにちは、ゲストさん！</h1>
        <p class="lead">
          You have already logged in.<br>
          please enter members page!
        </p>
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
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
export default {
  asyncData() {
    return {
      isWaiting: true
    }
  },
  computed: {
    ...mapState('auth', [
      'name',
      'isLogin'
    ])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
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
      firebase.auth().signInWithRedirect(provider)
    },
    logOut() {
      this.$firebase.auth().signOut()
    }
  }
}
</script>

<style></style>
