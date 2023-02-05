<template>
    <div>
        <h2>Balance des dépenses</h2> 
        <p>Total dépensé : {{ totalDepense }}</p> <!-- on recupere le resultat de la fonction totalDepense-->
        <table v-if="depenses.length != 0" class="table">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Dépenses</th>
                    <th scope="col">Solde</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="membre in membres" :key="membre.name"> <!-- on boucle sur la listes des membres et on affiche son contenu -->
                    <td>{{ membre.name }}</td> 
                    <td>{{ depenseMembre(membre.name) }}</td> 
                    <td :class="{ 'bien': membre.balance >= 0, 'credit': membre.balance < 0 }">
                        {{ totalBalanceMembre(membre) }}
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-else> Aucune dépense</p>
    </div>
</template>

<script>
export default {
    name: 'BaLance',
    props: {
        accountId: String
    },
    data() {
        return {
            membres: [],
            depenses: [],
        }
    },
    created() {
        /**
         * au chargement de la page on récupére les données du localStorage en appliquant un filtre
         */
        this.membres = JSON.parse(localStorage.getItem('members')).filter(member => member.accountId == this.accountId) || []
        this.depenses = JSON.parse(localStorage.getItem('expenses')).filter(expense => expense.accountId == this.accountId) || []


    },
    computed: {
        /**
         * fonction qui retourne le total des dépenses
         * @return int
         */
        totalDepense() { 
            let depense = 0;
            for (const expense of this.depenses) {
                depense += expense.price;
            }
            return depense;
        },


    },

    methods: {
        /** fonction qui retourne le total des dépenses d'un membre
         * @return int
         */
        depenseMembre(memberName) {
            let depenseMembre = this.depenses.filter(expense => expense.payer == memberName)
            let total = 0;
            for (const expense of depenseMembre) {
                total += expense.price;
            }
            return total;
        },

        /**
         * 
         * @param {*} member 
         * @return int
         * fonction qui retoure la balance d'un membre
         */

        totalBalanceMembre(member) {
            return this.depenseMembre(member.name) - (this.totalDepense / this.membres.length)
        }
    },
}
</script>

<style scoped>
.bien {
    color: green;
}

.credit {
    color: red;
}
</style>
