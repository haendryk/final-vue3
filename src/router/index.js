import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import patientsView from '../views/pacientes/patientsView'
import MascotaView from '../views/mascota/MascotaView'
import KardexVacunaView from '../views/mascota/KardexVacunaView'
import CitaView from '../views/cita/CitaView'
import LoginView from '../views/LoginView'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: patientsView,
    meta: { requiresAuth: true, role: ['admin','secretaria','doctor'] } 
  },
  {
    path: '/cita',
    name: 'cita',
    component: CitaView,
    meta: { requiresAuth: true, role: ['admin','secretaria'] } 
  },
  {
    path: '/mascota',
    name: 'mascota',
    component: MascotaView,
    meta: { requiresAuth: true, role: ['admin','doctor'] } 
  },
  {
    path: '/mascota/:id/vacunas',
    name: 'masctaVacunas',
    component: KardexVacunaView,
    meta: { requiresAuth: true, role: ['admin','doctor'] } 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userRole = store.getters.rol;
    console.log('guard', userRole);
    if (to.meta.role.includes(userRole)) {
      next();
    } else {
      next('/login'); // Redirigir a la página de inicio si no tiene permisos
    }
  } else {
    next(); // Asegúrate de llamar a next()
  }
});

export default router
