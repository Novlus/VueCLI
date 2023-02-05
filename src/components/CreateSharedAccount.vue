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
        <!-- <div class="input-group mb-3">
            <span for="sharedAccountDate" class="input-group-text" id="basic-addon1">Date</span>
            <input ref="inputDate" v-model="date" v-on:keypress.enter="creationCompte()" type="date" class="form-control" id="sharedAccountDate">
        </div> -->
        <button class="btn btn-success" @click="creationCompte()">Valider</button>
    </div>
    <div v-if="errored == true" class="alert alert-danger" role="alert">
        <p class="mb-0">Vous devez remplir tous les champs!</p>
    </div>
    <div v-if="comptePartage != ''" class="affichageComptes">
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
                    <tr v-for="compte in comptePartage" :key="compte.libelle">
                        <td>{{ compte.libelle }}</td>
                        <td>{{ compte.description }}</td>
                        <td>{{ compte.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button  class="btn btn-danger" @click="deleteAllCompte()">Vider</button>
    </div>
</template>

<script>
export default {
    name: 'CreateSharedAccount',
    data()
    {
        return {
            comptePartage: [],
            number: 1,
            libelle:'',
            description:'',
            date:'',
            errored: false,
            saved: false
        }
    },
    methods:
    {
        focusInputDescription()
        {
            this.$refs.inputDescription.focus()
        },
        // focusInputDate()
        // {
        //     this.$refs.inputDate.focus()
        // },
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
        creationCompte()
        {   
            const dateString = this.DateDuJour();
            this.errored = false;
            if(this.libelle != ''&& this.description != '')
            {
                
              
                const compte = {};
                compte.id = this.number.toString();
                compte.libelle = this.libelle;
                compte.description = this.description;
                compte.date = dateString
                this.comptePartage.push(compte);
                console.log(this.comptePartage)
                this.saveCompte();
                this.number = this.number +1;
                this.resetForm();

            }
            else
            {
                this.errored = true;
            }
            

        }, test()
        {
            console.log(new Date());
        },

            deleteAllCompte()
             {// vide le local storage et redirige sur la même page
                localStorage.clear();
                location.replace(location.href);
    
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
        resetForm()
        {
            /**
             * Vide le formulaire contact
             */
            this.libelle= '';
            this.description = '';
            this.date = '';
        }
        

    },
    mounted()
    {
        if (localStorage.getItem('comptePartage'))
        {
            try {
                this.comptePartage =
                JSON.parse(localStorage.getItem('comptePartage'));
                let lastId = 0;
                if (this.comptePartage.length > 0) {
                    lastId = parseInt(this.comptePartage[this.comptePartage.length - 1].id);
                }
                this.number = lastId + 1;

            }
            catch(error)
            {
                console.log("erreur de récupération de l'objet comptePartage dans le localStorage");
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