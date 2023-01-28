<template>
    <div class="container my-5">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="display-4">Page inexistante</h2>
          <p class="lead">La page que vous avez demandé n'existe pas</p>
          <div class="error404">
            <h1 class="display-1">404</h1>
            <p>Erreur</p>
          </div>
          <router-link class="btn btn-primary my-3" to="/">Retour à la page d'accueil</router-link>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style>
.error404 {
    text-align: center;
    font-size: 8em;
    font-weight: bold;
    margin-top: 50px;
    color: #f44336;
}

h2 {
    text-align: center;
    margin-top: 25px;
    color: #f44336;
}

p {
    text-align: center;
    margin-top: 25px;
    color: #333;
}

router-link {
    display: block;
    text-align: center;
    margin-top: 50px;
    color: #333;
    text-decoration: none;
}
</style>