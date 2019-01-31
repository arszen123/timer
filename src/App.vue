<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #f48042;
}
.form-control {
  background-color: #f28952;
  color: white;
  border-color: white;
}
.form-control:focus {
  background-color: #f28952;
  color: white;
  border-color: white;
}
</style>
