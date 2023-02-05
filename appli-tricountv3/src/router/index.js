import { createRouter, createWebHistory } from 'vue-router';
import SharedAccount from '@/components/CreateSharedAccount.vue'
import Members from '@/components/AddMembers.vue'
import Expenses from '@/components/AddExpenses.vue'
import Balance from '@/components/Balance.vue'


const routes = [
  {path: '/', name: 'SharedAccount', component: SharedAccount},
  {path: '/accounts/:account_id', name: 'Members', component: Members},
  {path: '/Addexpenses', name: 'Expenses', component: Expenses},
  {path: '/balance', name: 'Balance', component: Balance}
]


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;