<template>
    <div>
      <h1>Compte {{ this.compte.name }} </h1>
  
      <h3>Liste des Membres de ce compte partagé</h3>
      <table v-if="membres.length != 0" class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Libelle</th>
            <th scope="col">Dépenses</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="membre in membres" :key="membre.name">
            <td> {{ membre.name }} </td>
            <td> {{ membre.totalExpenses }} </td>
            <td> <button class="btn btn-danger" @click="suppressionMembre(membre.name, membre.accountId)">x</button> </td> <!--appelle la methode suppressionMembre au clique du bouton-->
          </tr>
  
        </tbody>
      </table>
  
      <p v-else> Aucun membre </p>
  
      <br>
      <br>
  
      <h3>Ajouter un membre</h3>account
  
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Nom</span>
        </div>
        <input v-model="nom" type="text" class="form-control" placeholder="Nom" aria-label="Nom"
          aria-describedby="basic-addon1">
      </div>
      <button class="btn btn-success" type="button" @click.prevent="ajoutMembre()">Ajouter</button> <!-- ajoute un membre au clique du bouton -->
    </div>
    <hr>
    <div>
      <Expenses :account-id="accountId"></Expenses>
    </div>
    <hr>
    <div>
      <Balance :account-id="accountId"></Balance>
    </div>
  
  </template>
  
  <script>
  import Expenses from '@/components/AddExpenses.vue'; // on importe les component que l'on veut utiliser
  import Balance from '@/components/Balance.vue'
  export default {
    name: 'MemBers',
    components: {
      Expenses, Balance // on les utilises ici
    },
    data() {
      return {
        nom: '',
        membres: [],
        tousLesMembres: [],
        accountId: this.$route.params.account_id,
        compte: null
      }
    },
    created() {
      this.compte = JSON.parse(localStorage.getItem('sharedAccounts')).find(account => account.id == this.accountId); // on recupere les informations concernant ce compte dans le localStorage
      this.tousLesMembres = JSON.parse(localStorage.getItem('members')) || []; // on recupere les informations sur tous les membres dans le localStorage
      let compteMembres = [];
      this.tousLesMembres.forEach(member => {
        if (member.accountId == this.accountId) {
          compteMembres.push(member);
        }
      });
      this.membres = compteMembres;
  
    },
  
    methods: {
        /**
         * Methode qui permet d'ajouter un membre
         */
  
      ajoutMembre() {
        if (!this.nom) return
        if (this.tousLesMembres.find(member => member.name == this.name && member.accountId == this.accountId) != undefined) {
          alert("Member existe déja");
        } else {
          const member = {
            accountId: this.$route.params.account_id,
            name: this.nom,
            totalExpenses: 0
          }
          this.tousLesMembres.push(member)
          localStorage.setItem('members', JSON.stringify(this.tousLesMembres))
          this.membres.push(member)
          this.nom = ''
          this.$forceUpdate;
          location.replace(location.href); // recharge la page
        }
      },
      /**
       * 
       * @param {*} name 
       * @param {*} accountId 
       * Methode qui grâce à deux parametre peux supprimer un memhre
       */
      suppressionMembre(name, accountId) {
        const memberIndex = this.tousLesMembres.findIndex(member => member.name === name && member.accountId == accountId) // on verifie que le nom du membre correspond bien aux parametre nom et que son id est bien la meme que celle entrée en paramétre.
        this.tousLesMembres.splice(memberIndex, 1)// si c'est le cas on supprime le membre de la liste tousLesMembres (le deuxime paramatre de splice correspond aux nombre d'élément a supprimer)
        this.membres.splice(memberIndex, 1)
        localStorage.setItem('members', JSON.stringify(this.tousLesMembres)) // on enregistre ces nouvelles valeur dans le localStorage
        this.$forceUpdate; // censer forcer vuejs à modifier la view en cas de changement
        location.replace(location.href)
      }
    }
  }
  </script>

  <style>
  h3{
    color: red;
  }
</style>
  