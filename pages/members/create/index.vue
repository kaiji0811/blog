<template>
  <div>
    <div>
      <p>
        Title: <input v-model="title" type="text" value="">
      </p>
      <p>
        Article Content: <textarea v-model="content" cols="30" rows="10" />
      </p>
      <button @click="saveNewArticle()">
        save
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  data () {
    return {
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
      const newNoteKey = firebase.database().ref().child('notes').push().key
      const today = new Date()
      firebase
        .database()
        .ref(`notes/${this.uid}/${newNoteKey}`)
        .set({
          id: newNoteKey,
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
