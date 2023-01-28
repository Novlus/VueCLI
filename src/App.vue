<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <h1>Utilisation de Vue Router</h1>

  <nav>
    <router-link to ="/">Home page </router-link>
     | 
    <router-link to ="/user/1">infos user</router-link>
    | 
    <router-link to ="/carte">carte</router-link>
    | 
    <router-link to ="/localStorage">localStorage</router-link>
  </nav>
  <router-view />
  

</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
