<template>
    <div >
      <h1> Gestion d'un Compteur</h1>
      
      <p><slot></slot>: {{count}}</p>
      <button @click="count=count+1">Incrémenter de 1</button>
     
    </div>
  </template>
  
  <script>
  export default {
    name: 'CompteurVue',
    
    data()
        {
            return {
                count : 0
            }
        }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  