<template>
    <div class="formulaire">
        <div class="input-group mb-3">
            <span for="sharedAccountLabel" class="input-group-text" id="basic-addon1">Libellé</span>
            <input ref= "inputLibelle" v-model="libelle" v-on:keypress.enter="focusInputDescription()" type="text" class="form-control" id="sharedAccountLabel" placeholder="Entrez le libellé">
        </div>
        <div class="input-group mb-3">
            <span for="sharedAccountDescription" class="input-group-text" id="basic-addon1">Description</span>
            <input ref ="inputDescription" v-model="description"  v-on:keypress.enter="focusInputDate()" type="text" class="form-control" id="sharedAccountDescription" placeholder="Entrez la description">
        </div>
        <div class="input-group mb-3">
            <span for="sharedAccountDate" class="input-group-text" id="basic-addon1">Date</span>
            <input ref="inputDate" type="date" class="form-control" id="sharedAccountDate">
        </div>
        <button class="btn btn-success">Valider</button>
    </div>
    <div v-if="errored == true">
        <p>Vous devez remplir tous les champs!</p>
    </div>
</template>

<script>
export default {
    name: 'CreateSharedAccount',
    data()
    {
        return {
            comptePartage:[],
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
        focusInputDate()
        {
            this.$refs.inputDate.focus()
        },
        addContact(){
            this.errored = false;
            if(this.prenom != '' && this.nom != '' && this.ville != '' && this.codePostal != '' && this.adresse != ''){
                const contact = {};
                contact.prenom = this.prenom
                contact.nom = this.nom
                contact.ville = this.ville
                contact.codePostal = this.codePostal
                contact.adresse = this.adresse
            this.contactList.push(contact);
            console.log(this.contactList);
            this.saveContacts();
            this.resetForm();
            }
            else{
                this.errored = true;
            }
        },

        deleteContact()
        {
            localStorage.clear();
        },

        saveContacts()
        {
            /**
             * Enregistre la liste des contacts dans le local storage
             * @constant : contactList (array)
             * @return : saved = true (boolean)
             */

             const parsed = JSON.stringify(this.contactList);
             localStorage.setItem('contactList',parsed);
             this.saved = true;
            
            
        },
        resetForm()
        {
            /**
             * Vide le formulaire contact
             */
            this.prenom = '';
            this.nom = '';
            this.adresse = '';
            this.codePostal = '';
            this.ville = '';
        }
        

    },
    mounted()
    {
        if (localStorage.getItem('contactList'))
        {
            try {
                this.contactList =
                JSON.parse(localStorage.getItem('contactList'));
            }
            catch(error)
            {
                console.log("erreur de récupération de l'objet cintactList dans le localStorage");
            }
        }

        this.$refs.inputLibelle.focus();
    }
}
</script>

<style>
    .formulaire{
        margin-top: 60px;
    }
</style>