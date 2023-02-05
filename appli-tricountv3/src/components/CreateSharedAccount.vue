<template>
    <div>
        <div>
            <h2>Comptes partagés existants</h2>

            <table v-if="comptePartage.length != 0" class="table table-hover table-striped"> <!-- si le tableau comptePartage n'est pas vide on affiche ce qu'il y a en dessous-->
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date Création</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="compte in comptePartage" :key="compte.id" class="pointer" @click="changeRoute('Members', compte.id)"> <!-- ici on a une boucle pour afficher tous le contenu d'un compte suivi d'une fonction qui permet de changer de route qui se declenche aux clique du td-->
                        <td> {{ compte.name }} </td>
                        <td> {{ compte.description }} </td>
                        <td> {{ compte.date}} </td>
                    </tr>

                </tbody>
            </table>

            <div v-else>
                <p>Aucun compte n'est enregistré.</p>
            </div>
        </div>

        <br>
        <hr>
        <br>

        <div>
            <h2>Création du nouveau compte</h2>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Nom du compte</span>
                </div>
                <input v-model="NomCompte" type="text" class="form-control" placeholder="Nom" aria-label="Nom"
                    aria-describedby="basic-addon1">
            </div>

            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Description</span>
                </div>
                <textarea v-model="DescriptionCompte" placeholder="Description" class="form-control"
                    aria-label="description"></textarea>
            </div>
            <br>
            <button @click.prevent="creationComptePartage()" type="button"   
                class="btn btn-success">Créer</button> <!-- au clique du bouton créer on déclenche la fonction creationCompePartage-->
        </div>
        <div v-if="erreur == true" class="alert alert-danger" role="alert"> <!-- utilisation d'un booléen erreur -->
        <p class="mb-0">Vous devez remplir tous les champs!</p>
    </div>
    </div>
</template>

<script>


export default {
    name: 'CreateSharedAccount',
    data() {
        return {
            NomCompte: '',
            DescriptionCompte: '',
            comptePartage: [],
            IdCompte: null,
            erreur: false,
        }
    },
    created() {
        this.comptePartage= JSON.parse(localStorage.getItem('sharedAccounts')) || [] // au moment on l'on arrive sur la page aux récupére la liste sharedAccounts dans le local storage et on la stocke dans une variable
    },
    methods: {
        /**
         * Fonction qui permet de créer un compte partage et de renvoyer un message d'erreur si le formulaire n'est pas remplie
         */
        creationComptePartage() {
            let dateJour = this.DateDuJour();
            if(this.NomCompte != '' && this.DescriptionCompte != ''){ 
            const account = {
                id: this.comptePartage.length + 1,
                name: this.NomCompte,
                description: this.DescriptionCompte,
                date: dateJour
            }
            this.comptePartage.push(account)
            localStorage.setItem('sharedAccounts', JSON.stringify(this.comptePartage))
            this.NomCompte = ''
            this.DescriptionCompte = ''}
            else{
                this.erreur = true;
            }
        },
        /**
         * fonction qui renvoit la date du jour au format français
         * @return String
         */
        DateDuJour()
        {
            const date = new Date();
                const dateString = date.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                    });
                return dateString;
        },

        /**
         * 
         * @param {*} routeName 
         * @param {*} params 
         * cette fonction sert à changer de route
         */

        changeRoute(routeName, params){
            this.$router.push({name: routeName, params: {account_id: params}})
        }
    }
}
</script>

