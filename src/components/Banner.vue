<template>
  <div class="d-flex justify-content-center align-items-center">
    <b-avatar :src="src" alt="bodegraaf banklogo" size="200"/>
    <h2 class="me-2">Bodegraaf Scoreboard</h2>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: {
    "src":{
      type: String,
      default: "https://i.imgur.com/9Kf0CjE.png"
    }
  }
}
</script>

<style scoped>

</style>
