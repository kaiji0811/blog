<template>
  <div class="d-flex flex-nowrap flex-column flex-sm-row justify-content-between justify-content-lg-start align-items-center">
    <b-link
      router-tag="div"
      v-for="item in itemsOrderByCreated"
      :key="item.id"
      :to="{name: 'articles-id', params: { id: item.title }}"
    >
      <b-card tag="article" :img-src="item.thumb" style="max-width: 20rem;" class="mb-2 mx-2">
        <b-card-title>
          {{ item.title }}
        </b-card-title>
        <b-card-text class="text-right">
          <small class="d-block text-muted">
            {{ item.name }}
          </small>
          <small class="d-block text-muted">
            {{ item.created }}
          </small>
        </b-card-text>
      </b-card>
    </b-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Auth, Provider } from '@/plugins/firebase'
export default {
  middleware: 'getArticles',
  computed: {
    ...mapState('articles', ['items']),
    itemsOrderByCreated() {
      return Object.entries(this.items)
        .map(([key, value]) => ({
          ...value
        }))
        .sort((a, b) => {
          return a.created > b.created ? -1 : a.created < b.created ? 1 : 0
        })
    }
  },
  mounted() {
  },
  methods: {
    googleLogin() {
      Auth.signInWithRedirect(Provider.google())
    },
    logOut() {
      Auth.signOut()
    }
  }
}
</script>

<style></style>
