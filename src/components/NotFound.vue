<template>
    <h2>Page inexistante</h2>
    <p>La page que vous avez demandé n'existe pas</p>
    <div class="error404">Erreur<br/>404</div>
    <router-link to="/">Retour à la Home page</router-link>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style>
.error404
{
    margin-top : 30px;
    margin-bottom: 30px;
    font-weight: bold
}
</style>