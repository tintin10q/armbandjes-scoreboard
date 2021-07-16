<template>
  <div id="app">
    <b-container class="d-flex flex-column align-content-center justify-content-center p-3">
      <banner/>
      <nav id="nav" hidden>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </b-container>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import Banner from "@/components/Banner";

export default {
  components: {Banner}
}
</script>
