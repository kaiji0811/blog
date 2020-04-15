<template>
  <div>
    <NavBar />
    <div class="container py-5">
      <nuxt />
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>
<style lang="scss">
</style>
