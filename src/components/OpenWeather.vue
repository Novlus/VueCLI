<template>
    <div class="box">
        <h1>Recherche de la météo pour une ville</h1>
            <div class="input-group mb-3">
                <input ref="input" v-model="city" v-on:keypress.enter="clickButton()" type="text" id="inputRecherche" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Renseignez une ville">
                <button v-on:click="clickButton()" id="btnValider" type="button" class="btn btn-primary">Valider</button>
              </div>
            <section v-if="errored">
                <p>Désolé, nous n'avons pas pu accéder au serveur de données, réessayez plus tard</p>
            </section>
            <section v-else>
                <div v-if="loading">
                    Chargement en cours...
                    <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else>
                    <div v-if="ville_error != null">
                        <h2> {{ville_error}} </h2>

                    </div>
                    <div> 
                        <div class="card" style="width: 25rem;">
                            <div class="card-body">
                                <img v-bind:src="image" />
                              <h5 class="card-title">temps : {{infoBrute.data.weather[0].description}}</h5>
                              <h5 class="card-title">nom de la ville ou de la zone : {{infoBrute.data.name}}</h5>
                              
                            </div>
                          </div>
                    </div>
                </div>
            </section>
     
    </div>
  </template>
     <!-- A l'aide de https://agify.io/, Ajoutez un component qui affichera une box donnant l'age estimé d'un prenom saisi
     notes : on donnera le focus a l'input au chargement de la page et on gèrera l'appui sur entrée pour valider la saisie
      et lancer la recherche en plus du bouton -->
  
  <script>
  
    import axios from "axios";

  export default {
    name: 'MeteoOpenWeather',
    
    data()
        {
            return {
                        errored:false,
                        loading:true,
                        infoBrute:null,
                        city:"",
                        image:null,
                        ville_error:null,
                        
                        
            }
        },
        methods:{
            clickButton()
                    {
                        this.errored= false
                        console.log("testClick")
                        console.log(this.prenom)
                        console.log("infoBrute: "+this.infoBrute)
                        axios
                        .get('https://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&APPID=5debc4b9bdcd4e91e20b6960bcfc50f0&units=metric&lang=fr'+ this.prenom)
                        .then (response => {
                            this.infoBrute = response;
                            console.log("name: "+this.infoBrute.data.name)
                            console.log("age"+this.infoBrute.data.name)
                            this.image ="http://openweathermap.org/img/w/" + this.infoBrute.data.weather[0].icon + ".png"
                            // if(this.infoBrute.data.Error== "Movie not found!")
                            // {
                            //     this.className= "hidden"
                            //     this.movie_error = "Le film que vous recherchez n'est pas disponible"
                            // }
                            // this.image = this.infoBrute.data.Poster
                            // console.log(this.image)
                            
                    })
                    .catch (error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(()=> this.loading = false);
                    //méthode appelée quand le callback d'une promise est exécuté : resolve ou reject, cela évite de dupliquer le code 
                    // dans .then et .catch
                    }
                   

        }, 
         mounted()
         {
            this.$refs.input.focus();
         }
         }
  
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .hidden{
        display: none;
    }
     .visible
        {
            display:block;
        }
    .box
    {
        margin-top: 20px;
        border: 1px solid black;
    }
  </style>
  