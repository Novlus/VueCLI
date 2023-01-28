import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // pas besoin de préciser index.js car vuejs le prend par défaut.

createApp(App).use(router).mount('#app')
