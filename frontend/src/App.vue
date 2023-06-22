<template>
  <div>
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
export default {
  components: { HeaderComponent },
  name: 'App',
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #252525;
}
</style>
