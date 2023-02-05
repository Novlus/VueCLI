<template>
    <!-- <button @click="test()">Test</button> -->
    <div class="row selectComptePartage">
        <div class="col-6">
            <h2>Choisissez un compte partagé</h2>
            <select class="form-control" id="mySelect" v-bind:size="selectSize" v-model="selected" @change="choixComptePartage()">
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
        choixComptePartage()
        {
            this.infoMembres = [];
           console.log(this.selected)
           this.getCompte();
           this.getCompteMembre();
        
        
        this.infoMembres.push(this.compteMembreSelected)

            

        }, test()
        {
            console.log(localStorage);
        },

            deleteMembre()
           
             {    
                this.contributeur = false;
                let listeMembres = JSON.parse(localStorage.getItem('listeMembres'));
                console.log(listeMembres);
                console.log(this.compteMembreSelected.length)
                for(let i = 0; i < this.compteMembreSelected.length; i++) {
                    if(this.compteMembreSelected[i].isChecked == true && this.compteMembreSelected[i].totalDepense == 0) {
                    console.log(this.compteMembreSelected[i])
                    console.log("totalDepenses")
                    console.log(this.compteMembreSelected[i].totalDepense)
                    let listeMembres2 = listeMembres.filter(membre => membre.id != this.compteMembreSelected[i].id || membre.pseudo != this.compteMembreSelected[i].pseudo);
                    console.log("liste des membres après suppression");
                    console.log(listeMembres2);
                    listeMembres = listeMembres2
                    }
                    if(this.compteMembreSelected[i].isChecked == true && this.compteMembreSelected[i].totalDepense != 0){
                        this.contributeur = true;
                    }
                }
                localStorage.setItem('listeMembres', JSON.stringify(listeMembres));
                if(this.contributeur == false)
                {
                    location.replace(location.href);
                }
            },

        saveCompte()
        {
            /**
             * Enregistre la liste des contacts dans le local storage
             * @constant : contactList (array)
             * @return : saved = true (boolean)
             */

             const parsed = JSON.stringify(this.comptePartage);
             localStorage.setItem('comptePartage',parsed);
             this.saved = true;
            
            
        },
        // resetForm()
        // {
        //     /**
        //      * Vide le formulaire contact
        //      */
        //     this.pseudo= '';
            
        // },
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

        getCompteMembre()
        {
        
        let compteMembres = JSON.parse(localStorage.getItem('listeMembres'));
        let compteMembresSelected = [];
        for (let i = 0; i < compteMembres.length; i++) {
            if (compteMembres[i].id == this.idSelected) {
                compteMembres[i].isChecked = false
                compteMembresSelected.push(compteMembres[i]);
            }
        }
        this.compteMembreSelected = compteMembresSelected;
        return compteMembresSelected;

        },
        ajoutMembre() {
            this.membreExistant = false;
            this.errored = false;
            if (this.pseudo != '') {
                let pseudo = this.pseudo;
                let idCompte = this.getCompte().id;

                let listeMembres = localStorage.getItem("listeMembres");
                if (listeMembres === null) {
                    listeMembres = [];
                    } else {
                    listeMembres = JSON.parse(listeMembres);
                    }

                    let membreExistant = listeMembres.find(
                    membre => membre.id === idCompte && membre.pseudo === pseudo);
                    if (!membreExistant) {
                        const infoMembre = {};
                        infoMembre.id = idCompte;
                        infoMembre.pseudo = pseudo;
                        infoMembre.totalDepense = 0;
                        infoMembre.depense = [];

                        listeMembres.push(infoMembre);
                        localStorage.setItem("listeMembres", JSON.stringify(listeMembres));
                        console.log(localStorage);
                        location.replace(location.href);
                    } else {
                    console.log("Ce membre existe déjà dans la liste");
                    this.membreExistant = true;
                    }
                } else {
            this.errored = true;
                 }
    }
        

        

    },
    mounted()
    {
        if (localStorage.getItem('comptePartage'))
        {
            try {
                this.comptePartage =
                JSON.parse(localStorage.getItem('comptePartage'));
                this.selectSize = this.comptePartage.length;
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