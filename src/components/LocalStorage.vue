<template>
    <h2>Persistance des données: localStorage</h2>
    <h4>Contacts enregistrés</h4>
    <h4>Ajouter un contact</h4>
    <label>Prénom: </label>
    <input type="text" v-model="prenom"><br/>
    <label>Nom: </label>
    <input type="text" v-model="nom"><br/>
    <label>Adresse: </label>
    <input type="text" v-model="adresse"><br/>
    <label>Code postale: </label>
    <input type="text" v-model="codePostal"><br/>
    <label>Ville: </label>
    <input type="text" v-model="ville"><br/>
    <button @click="addContact()">Valider</button>
    <button @click="deleteContact()">Supprimer</button>   
    <div v-if="errored == true">
        <p>Vous devez remplir tous les champs!</p>
    </div>
    <div v-else>
        <p><strong>Contact enregistré</strong></p>
        <table>
            <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Code postal</th>
            <th>Ville</th>
            </tr>
            <tbody v-if="contactList == ''">
                <tr >
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                </tr>
               
            </tbody>
            
            <tbody v-else v-for="contact in contactList" :key="contact.nom">
                <tr>
                    <td>{{ contact.prenom }}</td>
                    <td>{{ contact.nom }}</td>
                    <td>{{ contact.adresse }}</td>
                    <td>{{ contact.codePostal }}</td>
                    <td>{{ contact.ville }}</td>
                </tr>

            </tbody>
        </table>

    </div>
</template>

<script>


export default {
    name: 'DonneePersistances',

    data()
    {
        return {
            contactList:[],
            nom:'',
            prenom:'',
            adresse:'',
            codePostal:'',
            ville:'',
            errored: false,
            saved: false
        }
    },
    methods:
    {
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
    }
}
</script>

<style>

</style>