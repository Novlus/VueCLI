<template>
    <div class="row selectComptePartage">
        <div class="col-6">
            <h2>Choisissez un compte partagé</h2>
            <select class="form-control" id="mySelect" v-bind:size="selectSize" v-model="selected" @change="choixComptePartage()"> <!-- au changement de libelle de compte on déclenche la fonction choixComptePartage -->
                <option v-for="compte in comptePartage" :key="compte.id">{{compte.libelle}}</option>
            </select>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="pseudoInput">Pseudo du membre à ajouter :</label>
                <input type="text" class="form-control" id="pseudoInput" :disabled="!selected" v-model="pseudo" v-on:keypress.enter="ajoutMembre()">
            </div>
            <button class="btn btn-primary" :disabled="!selected" @click="ajoutMembre()">Ajouter le membre</button>
        </div>
        <div v-if="errored == true" class="alert alert-danger" role="alert">
            <p class="mb-0">Vous devez remplir le champ pour ajouter un membre!</p>
        </div>
        <div v-if="membreExistant == true" class="alert alert-danger" role="alert">
            <p class="mb-0">Ce membre exite déja vous ne pouvez pas le rajouter!</p>
        </div>
    </div>
    <div v-if="selected && infoMembres.length > 0">
        <h2>Membres du compte sélectionné</h2>
        <table class="table table-striped">
            <thead>
                <tr><th></th>
                    <th>Pseudo</th>
                    <th>total des dépenses</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="membre in compteMembreSelected" :key="membre.pseudo">
                    <td>
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="membre.isChecked">

                    </td>
                    <td>{{ membre.pseudo }}</td>
                    <td>{{ membre.totalDepense }}</td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-danger" @click="deleteMembre">Supprimer un membre</button>
        <div v-if="contributeur == true" class="alert alert-danger" role="alert">
            <p class="mb-0">Vous ne pouvez pas supprimer un membre qui à déja dépensé de l'argent!</p>
        </div>
</div>
</template>

<script>


export default {
    name: 'SharedAccountMemberManagement',
    data()
    {
        return {
            membre: [],
            comptePartage: [],
            // number: 1,
            // libelle:'',
            // description:'',
            // date:'',
            errored: false,
            // saved: false
            selectSize : 0,
            selected : "",
            pseudo: "",
            idSelected: 0,
            compteSelected: [],
            compteMembreSelected: [],
            pseudosMembre : [],
            depenseMembre: [],
            infoMembres: [],
            isChecked: false,
            membreExistant: false,
            contributeur: false
        }
    },
    methods:
    {
        /*
        *  méthode qui sert à la Récupération des informations du compte sélectionné
        */
        

        choixComptePartage()
        {
           this.infoMembres = [];
           this.getCompte();
           this.getCompteMembre();
           this.infoMembres.push(this.compteMembreSelected)
        }, 

        /*
        * méthode qui sert à la suppression d'un membre
        */

            deleteMembre()
           
             {    
                this.contributeur = false; // boolean qui permet de savoir si un membre à déja dépensé de l'argent
                let listeMembres = JSON.parse(localStorage.getItem('listeMembres')); // on récupère la liste des membres qui contient tous les membres de tous les comptes partagés
                for(let i = 0; i < this.compteMembreSelected.length; i++) {
                    if(this.compteMembreSelected[i].isChecked == true && this.compteMembreSelected[i].totalDepense == 0) { // on vérifie si le membre est coché et si il n'a pas déja dépensé de l'argent
                    let listeMembres2 = listeMembres.filter(membre => membre.id != this.compteMembreSelected[i].id || membre.pseudo != this.compteMembreSelected[i].pseudo);
                    listeMembres = listeMembres2
                    }
                    if(this.compteMembreSelected[i].isChecked == true && this.compteMembreSelected[i].totalDepense != 0){ // si le membre est coché et qu'il a déja dépensé de l'argent
                        this.contributeur = true; // on passe le boolean à true pour afficher un message d'erreur
                    }
                }
                localStorage.setItem('listeMembres', JSON.stringify(listeMembres)); // on enregistre la nouvelle liste des membres dans le localStorage
                if(this.contributeur == false) // si il n'y a pas eu de problème on recharge la page
                {
                    location.replace(location.href);
                }
            },

            /*
            * méthode qui sert à récupérer les informations du compte sélectionné
            */

        getCompte() {
       // récupère les données du compte sélectionné dans le localStorage
        let compte = JSON.parse(localStorage.getItem('comptePartage'));
        for (let i = 0; i < compte.length; i++) {
            if (compte[i].libelle === this.selected) {
            this.idSelected = compte[i].id;
            this.compteSelected = compte[i];
            return compte[i];
             }
            }
        },

        /*
        * méthode qui sert à récupérer les informations des membres du compte sélectionné
        */
        getCompteMembre()
        {
        
        let compteMembres = JSON.parse(localStorage.getItem('listeMembres'));
        let compteMembresSelected = [];
        for (let i = 0; i < compteMembres.length; i++) {
            if (compteMembres[i].id == this.idSelected) { // on récupère les membres qui ont le même id que le compte sélectionné
                compteMembres[i].isChecked = false // on ajoute un attribut isChecked à chaque membre pour savoir si il est coché ou non
                compteMembresSelected.push(compteMembres[i]); // on ajoute le membre à la liste des membres du compte sélectionné
            }
        }
        this.compteMembreSelected = compteMembresSelected; // on enregistre la liste des membres du compte sélectionné dans une variable
        return compteMembresSelected;

        },

        /*
        * méthode qui sert à l'ajout d'un membre
        */
        ajoutMembre() {
            this.membreExistant = false; // boolean qui permet de savoir si le membre existe déjà 
            this.errored = false; // boolean qui permet de savoir si le pseudo est vide 
            if (this.pseudo != '') { // si on a rempli le champ pseudo
                let pseudo = this.pseudo;
                let idCompte = this.getCompte().id; // on récupère l'id du compte sélectionné

                let listeMembres = localStorage.getItem("listeMembres"); // on récupère la liste des membres qui contient tous les membres de tous les comptes partagés
                if (listeMembres === null) { // si la liste est vide
                    listeMembres = [];
                    } else {
                    listeMembres = JSON.parse(listeMembres); // on parse la liste des membres pour pouvoir l'utiliser en tant que liste d'objet
                    }

                    let membreExistant = listeMembres.find(  // on vérifie si le membre existe déjà dans la liste
                    membre => membre.id === idCompte && membre.pseudo === pseudo);
                    if (!membreExistant) { // si le membre n'existe pas on l'ajoute à la liste
                        const infoMembre = {}; // on crée un objet qui contient les informations du membre
                        infoMembre.id = idCompte;
                        infoMembre.pseudo = pseudo;
                        infoMembre.totalDepense = 0;
                        infoMembre.depense = [];

                        listeMembres.push(infoMembre); // on ajoute le membre à la liste des membres
                        localStorage.setItem("listeMembres", JSON.stringify(listeMembres)); // on enregistre la liste des membres dans le localStorage
                        location.replace(location.href); // on recharge la page
                    } else {
                    console.log("Ce membre existe déjà dans la liste"); // si le membre existe déjà on affiche un message d'erreur
                    this.membreExistant = true; // on passe le boolean à true pour afficher un message d'erreur
                    }
                } else {
            this.errored = true; // si le champ pseudo est vide on passe le boolean à true pour afficher un message d'erreur
                 }
    }
        

        

    },
    mounted() 
    {
        if (localStorage.getItem('comptePartage')) // on récupère les données du compte partagé dans le localStorage
        {
            try {
                this.comptePartage =
                JSON.parse(localStorage.getItem('comptePartage'));
                this.selectSize = this.comptePartage.length; // on récupère la taille de la liste des comptes partagés
            }
            catch(error)
            {
                console.log("erreur de récupération de l'objet comptePartage dans le localStorage");
            }
        }

        if (localStorage.getItem('listeMembres'))
        {
            try {
                this.compteMembreSelected =
                JSON.parse(localStorage.getItem('listeMembres'));
            }
            catch(error)
            {
                console.log("erreur de récupération de l'objet listeMembres dans le localStorage");
            }
        }
        
        
    }
}
</script>

<style>
    

    
        .selectComptePartage
        {
            margin-top: 60px;
        }
</style>