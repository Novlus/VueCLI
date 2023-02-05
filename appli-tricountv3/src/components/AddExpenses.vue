<template>
    <div>
        <h2>Dépenses</h2>

        <table v-if="depenses.length != 0" class="table table-striped"> <!-- si le tableau depenses n'est pas vide alors on affiche ce qu'il y a en dessous-->
            <thead>
                <tr>
                    <th scope="col">Payeur</th>
                    <th scope="col">Libéllé</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="depense in depenses" :key="depense.id"> <!-- on recupere tous ce qu'il y a dans depenses-->
                    <td> {{ depense.depense }} </td>
                    <td> {{ depense.libelle }} </td>
                    <td> {{ depense.prix }} </td>
                    <td> {{ depense.date }} </td>
                </tr>
            </tbody>
        </table>

        <p v-else> Aucune dépense </p>

        <h3>Ajouter une dépense</h3>
        
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Payeur</span>
            </div>
            <select class="form-select" v-model="depense" id="payer">
            <option v-for="membre in membres" :key="membre.name" :value="membre.name"> <!-- on affiche ce qu'il y a dans membres-->
                {{ membre.name }}
            </option>
        </select>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Libéllé</span>
            </div>
            <input v-model="libelle" type="text" class="form-control" placeholder="Libéllé" aria-label="Libéllé"
                aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Prix</span>
            </div>
            <input v-model="prix" type="number" class="form-control" aria-label="Price"
                aria-describedby="basic-addon1">
        </div>
        <button class="btn btn-success" type="button" @click.prevent="ajoutDepense()">Ajouter</button>  <!-- au clique on appeller la fonction ajoutDepense-->


 
    </div>
</template>

<script>
export default {
    name: 'ExPenses',
    props: {
        accountId: String
    },
    data() {
        return {
            depense: '',
            libelle: '',
            prix: 0,
            depenses: [],
            membres: [],
            totalDepenses: [],
            account: this.accountId,
        }
    },
    created() { // au lancement de la page on recupére des informations dans le localstorage
        let depensesCompte = JSON.parse(localStorage.getItem('expenses')) || []
        let compteMembres = JSON.parse(localStorage.getItem('members')) || []

        this.totalDepenses = depensesCompte

        this.depenses = depensesCompte.filter(expense => expense.accountId == this.accountId) || [] // on initialise deux variables
        this.membres = compteMembres.filter(member => member.accountId == this.accountId) || []
    },
    methods: { 
        /**
         * retourne la date du jour au format français
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
        /** methode qui ajoute une depense */
        ajoutDepense() {
            if (!this.depense || !this.libelle || !this.prix) return // si le formulaire est remplis on crée cette objet
            let dateJour = this.DateDuJour()
            const expense = {
                id: Date.now(),
                accountId: this.accountId,
                depense: this.depense,
                libelle: this.libelle,
                prix: this.prix,
                date: dateJour
            }
            this.depenses.push(expense)
            this.totalDepenses.push(expense)
            localStorage.setItem('expenses', JSON.stringify(this.totalDepenses))
            // Mettre à jour le total des dépenses du payeur
            const depense = this.membres.find(member => member.name === expense.depense)
            depense.totalDepenses += expense.price
            // localStorage.setItem('members', JSON.stringify(this.members))
            this.depense = ''
            this.libelle = ''
            this.prix = 0
            this.$forceUpdate;
        }
    }
}
</script>
