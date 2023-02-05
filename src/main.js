import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bootstapcss from'bootstrap/dist/css/bootstrap.css'
import jquery from 'jquery'
import Popper from 'popper.js'
import bootstrapjs from 'bootstrap/dist/js/bootstrap.js'



window.$ = window.jQuery = jquery;

createApp(App).use(router,jquery,Popper,bootstapcss,bootstrapjs).mount('#app')