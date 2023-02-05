<template>
    <div class="row selectComptePartage">
         <div class="col-6">
             <h2>Choisissez un pseudo</h2>
             <select class="form-control" id="mySelect" v-bind:size="selectSize" v-model="selected" @change="choixPseudo()">
                 <option v-for="membre in uniquePseudos" :key="membre.id">{{membre.pseudo}}</option>
             </select>
         </div>
         <div v-if="selected">
            <h2>Comptes partagés liés à ce membres</h2>
            <table class="table table-striped">
            <thead>
                <tr>
                    <th>Libelle</th>
                </tr>
            </thead>
            <tbody v-if="hidden == false">
                <tr  v-for="libelle in libelleComptePartage" :key="libelle.libelle">
                    <td @click="displayDetails(libelle)">{{ libelle.libelle }}</td>
                        <div  v-for="depense in depensesSelected" :key="depense.libelle" >
                            <td>{{ depense.libelle }}</td>
                            <td>{{ depense.montant }}</td>
                            <td>{{ depense.date }}</td>
                        </div>

                </tr>
            </tbody>
            <tbody v-if="hidden == true">
                <tr  v-for="libelle in libelleComptePartage" :key="libelle.libelle">
                    <td @click="displayDetails(libelle)">{{ libelle.libelle }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="hidden == false">
        <!-- <p>
                     <ul v-for=" depense in depensesSelected" :key="depense.libelle"> 
                        <li> {{ depense.libelle }}</li>
                        <li> {{ depense.montant }}</li>
                        <li> {{ depense.date }}</li>
                    </ul> --> 
        <!-- </p> -->
        <button @click="ajoutDepense" class="btn btn-primary">ajouter une dépense</button>
    </div>
     </div>
    </div>
 </template>
 <script>
 export default {
     name: 'AddExpense',
     data() {
         return {
             selected: '',
             selectSize: 0,
             compteMembreSelected: [],
             comptePartage: [],
             membreInfoSelected: [],
             libelleComptePartage: [],
             selectedLibelle: '',
             depenses: [],
             hidden: true,
             depensesSelected: [],
         }
     },
     methods: {
         choixPseudo() {
            this.membreInfoSelected = [];
            this.libelleComptePartage = [];
        
             this.compteMembreSelected.forEach(membre => {
                 if (membre.pseudo === this.selected) {
                    const membres = {}
                     membres.id = membre.id
                     membres.pseudo = membre.pseudo
                     membres.totalDepense = membre.totalDepense
                     this.membreInfoSelected.push(membres);
                    
                 }
                 
             });
             this.membreInfoSelected.forEach(membre => {
                let libelleCompte = this.getComptePartageLibelle(membre.id);
                const libelles = {}
                libelles.libelle = libelleCompte
                this.libelleComptePartage.push(libelles) ;
             })


             console.log("libelle")
            console.log(this.libelleComptePartage)
            console.log("infoMembre")
             console.log(this.membreInfoSelected);
         },
         getComptePartageLibelle(idMembre) {
            const comptePartage = this.comptePartage.find(compte => compte.id === idMembre);
            return comptePartage ? comptePartage.libelle : '';
            },
            getPseudoMembre()
            {   
                console.log("this.membreInfoSelected")
                console.log(this.membreInfoSelected)
                return this.membreInfoSelected[0].pseudo;

            },
            displayDetails(libelle) {
                this.hidden = false;
                console.log("libelle")
                console.log(libelle.libelle)
                this.selectedLibelle = libelle;
                let listeDepensesString = localStorage.getItem('listeMembres');
                let listeDepenses = JSON.parse(listeDepensesString);
                
                //let i = 0;
                console.log("listeDepenses");
                console.log(listeDepenses);
                let idMembre = this.getMemberId(this.selectedLibelle)
                let pseudoMembre = this.getPseudoMembre()
                for (let i = 0; i < listeDepenses.length; i++) {
                    if (listeDepenses[i].id === idMembre && listeDepenses[i].pseudo === pseudoMembre ) {
                        const depenseMembre = {}
                        depenseMembre.libelle = listeDepenses[i].libelle
                        depenseMembre.montant = listeDepenses[i].montant
                        depenseMembre.date = listeDepenses[i].date
                        depenseMembre.pseudo = pseudoMembre

                        this.depenses.push(depenseMembre);
                        }
                        i++;
                    }
                    console.log("this.depenses")
                    console.log(this.depenses)
                
                console.log("depenses")
                console.log(this.depenses)
                for(let i = 0; i < this.depenses.length; i++) {
                    if (this.depenses[i].pseudo === pseudoMembre && this.depenses[i].id === idMembre ) {
                        const depenseSelected = {}
                        depenseSelected.libelle = this.depenses[i].libelle
                        depenseSelected.montant = this.depenses[i].montant
                        depenseSelected.date = this.depenses[i].date
                        depenseSelected.pseudo = this.depenses[i].pseudo
                        this.depensesSelected.push(depenseSelected);
                    }
                }
                console.log("this.depensesSelected")
                console.log(this.depensesSelected)

        },
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
        getMemberId(sharedAccountName) {
            let Listemembre = this.membreInfoSelected;
            console.log("Listemembre");
            console.log(Listemembre);
            let ListeComptePartage = JSON.parse(localStorage.getItem('comptePartage')) || [];
            console.log("ListeComptePartage");
            console.log(ListeComptePartage);
            // je veux que dans ListeComptePartage je récupére l'id du compte partagé en fonction du libelle actuel
            
            let membreID = null;
            for (let i = 0; i <ListeComptePartage.length; i++) {
                console.log('longueur')
                console.log(ListeComptePartage.length);
                console.log("ListeComptePartage[i].libelle");
                console.log(ListeComptePartage[i].libelle);
                console.log("sharedAccountName");
                console.log(sharedAccountName);
                if (ListeComptePartage[i].libelle === sharedAccountName.libelle) {
                    membreID = ListeComptePartage[i].id;
                    console.log("id");
                    console.log(membreID);
                    return membreID;
               }

            }
          
           return null;},
     ajoutDepense() {

        let idMembre = this.getMemberId(this.selectedLibelle)
        let listeDepensesString = localStorage.getItem('listeMembres');
        let listeDepenses = JSON.parse(listeDepensesString);
        let date = this.DateDuJour();
        //this.choixPseudo();
        let pseudoMembre = this.getPseudoMembre()
        console.log("pseudoMembre");
        console.log(pseudoMembre);
        console.log("idMembre");
        console.log(idMembre);

        // Modification de la liste de dépenses
        listeDepenses.push({ id: idMembre, nom: "nouvelle dépense", montant: 50, date: date, pseudo: pseudoMembre });

        // Mise à jour de la liste de dépenses dans le local storage
        localStorage.setItem('listeMembres', JSON.stringify(listeDepenses));
        console.log("listeDepenses");
        console.log(listeDepenses);
        console.log("localStorage");
        console.log(localStorage);
     },
     },
     computed: {
         uniquePseudos() {
             let seen = new Set();
             return this.compteMembreSelected.filter(membre => {
                 let isUnique = !seen.has(membre.pseudo);
                 seen.add(membre.pseudo);
                 return isUnique;
             });
         }
     },
     mounted() {
         if (localStorage.getItem('comptePartage')) {
             try {
                 this.comptePartage = JSON.parse(localStorage.getItem('comptePartage'));
             } catch (error) {
                 console.log("erreur de récupération de l'objet comptePartage dans le localStorage");
             }
         }
 
         if (localStorage.getItem('listeMembres')) {
             try {
                 this.compteMembreSelected = JSON.parse(localStorage.getItem('listeMembres'));
                 this.selectSize = this.uniquePseudos.length;
             } catch (error) {
                 console.log("erreur de récupération de l'objet listeMembres dans le localStorage");
             }
         }
     }
 }
 </script>