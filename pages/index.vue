<template>
  <div class="wrapper">
    <!-- header -->
    <header class="header">
      <!-- Loading -->
      <div v-if="isWaiting" class="log_wait">
        <p>読み込み中</p>
      </div>
      <!-- !login -->
      <div v-else class="isLogin_wrap">
        <div v-if="!isLogin" class="btn_login">
          <button class="google_login" outlined @click="googleLogin">
            Googleでログイン
          </button>
        </div>
        <!-- login -->
        <div v-else class="log_wrap">
          <button class="google_logout" outlined @click="logOut">
            ログアウト
          </button>
        </div>
      </div>
    </header>
    <!-- body -->
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  asyncData () {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
        this.$router.push('members')
      } else {
        this.isLogin = false
        this.user = []
      }
    })
  },
  methods: {
    googleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logOut () {
      firebase.auth().signOut()
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
