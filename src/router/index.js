import { createRouter, createWebHistory } 
from "vue-router";
import HelloWorld from '@/components/HelloWorld.vue';
import NotFound from '@/components/NotFound.vue';
import CreateSharedAccount from '@/components/CreateSharedAccount.vue'

const routes = [
    { name: 'Hello', path: '/', component: HelloWorld},
    { name: 'CreateSharedAccount', path: '/createdsharedaccount', component: CreateSharedAccount},
    // mettre à la fin de toutes les routes
    { name: 'NotFound', path: '/:pathMatch(.*)', component: NotFound}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;