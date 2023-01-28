import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bootstapcss from'bootstrap/dist/css/bootstrap.css'
import bootstrapjs from 'bootstrap/dist/js/bootstrap.js'

createApp(App).use(router,bootstapcss,bootstrapjs).mount('#app')
