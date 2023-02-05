<template>
    <div class="formulaire">
        <div class="input-group mb-3">
            <span for="sharedAccountLabel" class="input-group-text" id="basic-addon1">Libellé</span>
            <input ref= "inputLibelle" v-model="libelle" v-on:keypress.enter="focusInputDescription()" type="text" class="form-control" id="sharedAccountLabel" placeholder="Entrez le libellé">
        </div>
        <div class="input-group mb-3">
            <span for="sharedAccountDescription" class="input-group-text" id="basic-addon1">Description</span>
            <input ref ="inputDescription" v-model="description"  v-on:keypress.enter="creationCompte()" type="text" class="form-control" id="sharedAccountDescription" placeholder="Entrez la description">
        </div>
        <button class="btn btn-success" @click="creationCompte()">Valider</button> <!-- au clique du bouton valider on déclenche la méthode creationCompte-->
    </div>
    <div v-if="errored == true" class="alert alert-danger" role="alert"> <!-- utilisation d'un booléen errored -->
        <p class="mb-0">Vous devez remplir tous les champs!</p>
    </div>
    <div v-if="comptePartage != ''" class="affichageComptes"> <!-- si le tableau comptePartage n'est pas vide alors on affiche les comptes -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Comptes crées</h3>
            </div>
             <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Libelle</th>
                        <th>Description</th>
                        <th>date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="compte in comptePartage" :key="compte.libelle"> <!-- on recupére les informations se trouvant dans le tableau comptePartage-->
                        <td>{{ compte.libelle }}</td>
                        <td>{{ compte.description }}</td>
                        <td>{{ compte.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button  class="btn btn-danger" @click="deleteAllCompte()">Vider</button> <!-- au clique du bouton vider on déclenche la méthode deleteAllCompte-->
    </div>
</template>

<script>
export default {
    name: 'CreateSharedAccount',
    data()
    {
        return {
            comptePartage: [], // tableau qui contiendra les comptes
            number: 1, // variable qui permettra de générer un id unique pour chaque compte
            libelle:'', // recupère la valeur du champ libelle
            description:'', // recupère la valeur du champ description
            errored: false,
            saved: false
        }
    },
    methods:
    {
        /**
         * Méthode qui permet de focus sur le chamt de texte suivant en l'occurence le champ description
         */
         
        focusInputDescription()
        {
            this.$refs.inputDescription.focus() 
        },
       
        /**
         * Méthode qui permet de récupérer la date du jour au format français
         * @return : dateString (string)
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
         * Méthode qui permet de créer un compte
         * @constant : dateString (string)
         * @constant : compte (object)
         * @return : comptePartage (array)
         */
        creationCompte()
        {   
            const dateString = this.DateDuJour();
            this.errored = false; // on remet le booléen errored à false pour que le message d'erreur disparaisse
            if(this.libelle != ''&& this.description != '') // si l'utilisateur à remplis le formulaire
            {
                
              
                const compte = {}; // on crée un objet compte qui contiendra un id unique, le libelle, la description et la date du jour
                compte.id = this.number.toString();// je converti le nombre en string car le local storage ne prend que des string
                compte.libelle = this.libelle;
                compte.description = this.description;
                compte.date = dateString
                this.comptePartage.push(compte); // on ajoute l'objet compte au tableau comptePartage
                this.saveCompte(); // on enregistre le tableau dans le local storage
                this.number = this.number +1; // on incrémente le nombre pour que l'id soit unique
                this.resetForm();// on vide le formulaire

            }
            else // si l'utilisateur n'a pas remplis le formulaire
            {
                this.errored = true;
            }
            

        },

            deleteAllCompte()
             {// vide le local storage et redirige sur la même page
                localStorage.clear();
                location.replace(location.href);
    
             },

        saveCompte()
        {
            /**
             * Enregistre la liste comptePartage dans le local storage
             * @constant : comptePartage (array)
             * @return : saved = true (boolean)
             */

             const parsed = JSON.stringify(this.comptePartage); // on converti le tableau en string
             localStorage.setItem('comptePartage',parsed);// on enregistre le tableau dans le local storage
             this.saved = true;
            
            
        },
        resetForm()
        {
            /**
             * Vide le formulaire de creation de compte
             */
            this.libelle= '';
            this.description = '';
        }
        

    },
    mounted() // au chargement de la page
    {
        if (localStorage.getItem('comptePartage')) // si le LocalStorage contient un tableau comptePartage
        {
            try { // on essaie de récupérer le tableau
                this.comptePartage =
                JSON.parse(localStorage.getItem('comptePartage'));
                let lastId = 0; // on récupère l'id du dernier compte
                if (this.comptePartage.length > 0) {
                    lastId = parseInt(this.comptePartage[this.comptePartage.length - 1].id);
                }
                this.number = lastId + 1; // on incrémente l'id pour que l'id soit unique

            }
            catch(error)
            {
                console.log("erreur de récupération de l'objet comptePartage dans le localStorage"); // sinon on affiche ce message d'erreur dans la console
            }
        }

        this.$refs.inputLibelle.focus();
    }
}
</script>

<style>
    .formulaire,.alert,.affichageComptes{
        margin-top: 60px;
    }
    
</style>