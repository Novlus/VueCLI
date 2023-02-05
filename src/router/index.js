import { createRouter, createWebHistory } 
from "vue-router";
import HelloWorld from '@/components/HelloWorld.vue';
import NotFound from '@/components/NotFound.vue';
import CreateSharedAccount from '@/components/CreateSharedAccount.vue';
import SharedAccountMemberManagement from '@/components/SharedAccountMemberManagement';
import AddExpense from '@/components/AddExpense.vue';

const routes = [
    { name: 'Hello', path: '/', component: HelloWorld},
    { name: 'CreateSharedAccount', path: '/createdsharedaccount', component: CreateSharedAccount},
    { name: 'SharedAccountMemberManagement', path: '/sharedaccountmembermanagement', component: SharedAccountMemberManagement},
    { name: 'AddExpense', path: '/addexpense', component: AddExpense},
    // mettre à la fin de toutes les routes
    { name: 'NotFound', path: '/:pathMatch(.*)', component: NotFound}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;