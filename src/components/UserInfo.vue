<template>
    <h2>Information d'un user</h2>
    <p>Cette page se trouve dans UserInfo.vue</p>

    <h3>l'ID du user est :
        {{$route.params.user_id }}
    </h3>
    <div v-if="id<userList.length">
    
    <p>nom : {{ userList[id].name }}</p>
    <p>métier {{ userList[id].job }}</p>
    <p>num tél : {{ userList[id].phone }}</p>
    </div>
    <div v-else>
        <p>Le parametre n'est pas correct ou ne correspond pas à un utilisateur.</p>
    </div>
    <div class="input-group mb-3">
    <input v-model="identifiant" v-on:keypress.enter="rechercheID()" type="text" id="inputRecherche" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Renseignez un ID">
    <button v-on:click="rechercheID()" id="btnValider" type="button" class="btn btn-primary">Valider</button>
  </div>
</template>

<script>
export default {
    name:'UserInfo',
    data(){
        return{
            identifiant:"",
            userList: [
                {
                    name: 'Joe',
                    job: 'boulanger',
                    phone: '879865487'
                },
                {
                    name: 'Bob',
                    job: 'pâtissier',
                    phone: '879895487'
                },
                {
                    name: 'Jean',
                    job: 'charcutier',
                    phone: '879875487'
                }
            ]
            
        }
    },methods:{
            rechercheID()
                    {
                        
                        console.log(this.identifiant);
                        this.$route.params.user_id = this.identifiant;
                        console.log(this.$route.params.user_id);
                        return this.$route.params.user_id;
                       
                    }
                },
    computed: {
        // on recupère les parametres de la route
        id() { 
            return this.$route.params.user_id;
        }
    },  
    
}
</script>
<style>
</style>