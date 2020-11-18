<template>
  <div>
    <h1>プロフィール</h1>
    <div class="form-group">
      <label for="content">ユーザーの名前</label>
      <input id="nickName" v-model.lazy="nickName" type="text" class="form-control" placeholder="ニックネームを設定してください">
    </div>
    <div class="form-group">
      <b-button variant="primary" @click="update"> 上書きする </b-button>
    </div>
  </div>
</template>

<script>
import { DB } from '@/plugins/firebase'

export default {
  computed: {
    uid() {
      return this.$store.state.auth.uid
    },
    nickName: {
      get() {
        return this.$store.state.auth.nickName
      },
      set (val) {
        this.$store.dispatch('auth/updateUserNickname', val)
      }
    }
  },
  methods: {
    update() {
      DB.ref(`users/${this.uid}`).update(
        {
          nickName: this.nickName
        },
        error => {
          if (!error) {
            alert('DONE!')
          } else {
            alert('ERROR!')
          }
        }
      )
    }
  }
}
</script>

<style>
</style>
