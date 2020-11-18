<template>
  <div>
    <form>
      <div class="form-group">
        <label for="thumb">画像</label>
        <input id="thumb" v-model="thumb" type="text" class="form-control" placeholder="記事のタイトルを入力してください">
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
        <b-button variant="primary" v-b-modal.modal-preview>
          プレビュー
        </b-button>
        <b-modal id="modal-preview" title="プレビュー" okTitle="投稿する" cancelTitle="キャンセル" size="lg" @ok="saveNewArticle">
          <div v-html="$md.render(content)" />
        </b-modal>
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
import { DB } from '@/plugins/firebase'

export default {
  data () {
    return {
      url: '',
      title: '',
      thumb: 'https://picsum.photos/600/300?grayscale',
      content: ''
    }
  },
  computed: {
    ...mapState('auth', {
      uid: 'uid',
      nickName: 'nickName'
    })
  },
  methods: {
    preview () {
    },
    saveNewArticle () {
      const newNoteKey = DB.ref().child('articles').push().key
      const today = new Date()
      DB
        .ref(`articles/${this.uid}/${this.title}`)
        .set({
          id: newNoteKey,
          title: this.title,
          thumb: this.thumb,
          name: this.nickName,
          content: this.content,
          created: `${today.getFullYear()}/${today.getMonth()}/${today.getDay()} ${today.getHours()}:${today.getMinutes()}`
        },
        (error) => {
          if (!error) {
            this.$router.push('/members')
          } else {
            alert(error)
          }
        })
    }
  }
}
</script>

<style>

</style>
