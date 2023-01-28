<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <CompteurVue>1er compteur </CompteurVue>
  <CompteurVue>2eme compteur </CompteurVue> 
  <CalculAge> </CalculAge>
  <MeteoOpenWeather></MeteoOpenWeather>

</template>

<!-- Exercice : transformer en component l'exercice de Openweathermap pour afficher la météo dans cette page
faites un code propre et un component autonome
Respectez le workflow axios -->
<script>
import HelloWorld from './components/HelloWorld.vue'
import CompteurVue from './components/Compteur.vue'
import CalculAge from './components/Agify.vue'
import MeteoOpenWeather from './components/OpenWeather.vue'

export default {
  name: 'App',
  components: {
    HelloWorld, CompteurVue, CalculAge, MeteoOpenWeather
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
