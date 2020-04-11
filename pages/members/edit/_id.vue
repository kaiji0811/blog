<template>
  <div>
    <p>
      Title: <input v-model="title" type="text">
    </p>
    <p>
      Content: <textarea v-model="content" cols="30" rows="10" />
    </p>
    <button @click="update">
      Update
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/plugins/firebase'
export default {
  data () {
    return {
      id: this.$route.query.hash,
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapState('auth', {
      uid: 'uid'
    })
  },
  mounted () {
    setTimeout(() => {
      firebase
        .database()
        .ref(`notes/${this.uid}/${this.id}`)
        .once('value')
        .then((snapshot) => {
          this.title = snapshot.val().title
          this.content = snapshot.val().content
        })
    }, 0)
  },
  methods: {
    update () {
      firebase
        .database()
        .ref(`notes/${this.uid}/${this.id}`)
        .update({
          title: this.title,
          content: this.content
        },
        (error) => {
          console.log('aa')
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
