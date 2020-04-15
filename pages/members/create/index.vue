<template>
  <div>
    <form>
      <div class="form-group">
        <label for="url">URL</label>
        <input id="url" v-model="url" type="email" class="form-control" placeholder="記事のURLを設定してください">
      </div>
      <div class="form-group">
        <label for="title">タイトル</label>
        <input id="title" v-model="title" type="text" class="form-control" placeholder="記事のタイトルを入力してください">
      </div>
      <div class="form-group">
        <label for="content">本文</label>
        <textarea id="content" v-model="content" class="form-control" cols="30" rows="10" placeholder="本文を入力してください" />
      </div>
      <div class="form-group">
        <b-button variant="primary" @click="saveNewArticle">
          投稿する
        </b-button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  middleware: 'authentication',
  data () {
    return {
      url: '',
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapState('auth', {
      uid: 'uid'
    })
  },
  created () {
  },
  methods: {
    saveNewArticle () {
      const newNoteKey = firebase.database().ref().child('articles').push().key
      const today = new Date()
      firebase
        .database()
        .ref(`articles/${this.uid}/${this.url}`)
        .set({
          id: newNoteKey,
          url: this.url,
          title: this.title,
          content: this.content,
          created: `${today.getFullYear()}/${today.getMonth()}/${today.getDay()} ${today.getHours()}:${today.getMinutes()}`
        },
        (error) => {
          if (!error) {
            alert('DONE!')
          } else {
            alert('ERROR!')
          }
        })
    }
  }
}
</script>

<style>

</style>
