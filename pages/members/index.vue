<template>
  <div>
    <h1>ダッシュボード</h1>
    <div class="my-4 d-flex flex-row">
      <b-card
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-title>
          記事を<br class="d-block d-sm-none">作成する
        </b-card-title>
        <b-card-text>
          新しい記事を作成することが出来ます。
        </b-card-text>
        <b-button to="/members/create" variant="primary">
          記事を作成する
        </b-button>
      </b-card>
      <b-card
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="ml-4 mb-2"
      >
        <b-card-title>
          記事を<br class="d-block d-sm-none">編集する
        </b-card-title>
        <b-card-text>
          既にある記事を編集することが出来ます。
        </b-card-text>
        <b-button to="/members/edit" variant="primary">
          記事を編集する
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authentication'
}
</script>

<style>
</style>
