import { createRouter, createWebHistory } 
from "vue-router";
import HelloWorld from '@/components/HelloWorld.vue';
import UserInfo from '@/components/UserInfo.vue';
import NotFound from '@/components/NotFound.vue';
import CarteOS from '@/components/OpenStreetMap.vue'
import LocalStorage from '@/components/LocalStorage.vue'

const routes = [
    { name: 'Hello', path: '/', component: HelloWorld},
    { name:'user', path: '/user/:user_id', component: UserInfo},
    { name:'Carte', path: '/carte', component: CarteOS},
    { name:'LocalStorage', path: '/localStorage', component: LocalStorage},
    // mettre à la fin de toutes les routes
    { name: 'NotFound', path: '/:pathMatch(.*)', component: NotFound}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;