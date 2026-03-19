import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import CooperativesPage from '../views/CooperativesPage.vue'
import CooperativeDetailPage from '../views/CooperativeDetailPage.vue'
import CreateCooperativePage from '../views/CreateCooperativePage.vue'
import EditCooperativePage from '../views/EditCooperativePage.vue'
import FarmerDetailPage from '../views/FarmerDetailPage.vue'
import EditFarmerPage from '../views/EditFarmerPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/cooperatives', name: 'Cooperatives', component: CooperativesPage },
  { path: '/cooperatives/create', name: 'CreateCooperative', component: CreateCooperativePage },
  { path: '/cooperatives/:id', name: 'CooperativeDetail', component: CooperativeDetailPage },
  { path: '/cooperatives/:id/edit', name: 'EditCooperative', component: EditCooperativePage },
  { path: '/farmers/:id', name: 'FarmerDetail', component: FarmerDetailPage },
  { path: '/farmers/:id/edit', name: 'EditFarmer', component: EditFarmerPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
