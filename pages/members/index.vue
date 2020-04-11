<template>
  <div>
    Hello, {{ name }}!
    <div>
      <ul>
        <li>
          <nuxt-link to="/members/create">
            記事の新規作成
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/members/edit">
            記事の修正
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  data () {
    return {
      text: ''
    }
  },
  computed: {
    ...mapState('auth', {
      uid: 'uid',
      name: 'name'
    })
  },
  methods: {
    saveToFirebase (text) {
      const newNoteKey = firebase.database().ref().child('notes').push().key
      firebase
        .database()
        .ref(`notes/${this.uid}/${newNoteKey}`)
        .set(
          { content: text },
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
