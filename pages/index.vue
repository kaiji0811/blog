<template>
  <b-container
    class="d-flex flex-nowrap flex-column flex-sm-row justify-content-between justify-content-lg-start align-items-center"
  >
    <b-row align-v="stretch">
      <b-col
        cols="12"
        md="6"
        lg="4"
        v-for="item in itemsOrderByCreated"
        :key="item.id"
      >
        <b-link
          router-tag="div"
          :to="{ name: 'articles-id', params: { id: item.title } }"
        >
          <b-card
            tag="article"
            :img-src="item.thumb"
            class="mb-2 mx-2 border-0"
          >
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
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
  }
}
</script>

<style></style>
