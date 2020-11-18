<template>
  <div>
    <div class="form-group">
      <label for="title">タイトル</label>
      <input id="title" v-model="title" type="text" class="form-control" placeholder="記事のタイトルを入力してください">
    </div>
    <div class="form-group">
      <label for="content">本文</label>
      <textarea id="content" v-model="content" class="form-control" cols="30" rows="10" placeholder="本文を入力してください" />
    </div>
    <div class="form-group">
      <b-button variant="primary" @click="update">
        上書きする
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DB } from '@/plugins/firebase'
export default {
  data () {
    return {
      url: this.$route.params.id,
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
    DB
      .ref(`articles/${this.uid}/${this.url}`)
      .once('value')
      .then((snapshot) => {
        this.title = snapshot.val().title
        this.content = snapshot.val().content
      })
  },
  methods: {
    update () {
      DB
        .ref(`articles/${this.uid}/${this.url}`)
        .update({
          title: this.title,
          content: this.content
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

<style></style>
