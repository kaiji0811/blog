<template>
  <div>
    {{ title }}<br>
    {{ content }}<br>
    {{ created }}<br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DB } from '../../plugins/firebase'
// import { DB } from '@/plugins/firebase'
export default {
  data () {
    return {
      title: '',
      content: '',
      created: ''
    }
  },
  created () {
    DB
      .ref('articles/')
      .on('child_added', (snapshot) => {
        console.log(snapshot.val())
      })
  },
  computed: {
    ...mapGetters('articles', [
      'getArticle'
    ])
  }
}
</script>

<style></style>
