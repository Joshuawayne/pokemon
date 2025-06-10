import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import PokemonDetailView from '../views/PokemonDetailView.vue';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // This page requires login
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon-detail',
      component: PokemonDetailView,
      meta: { requiresAuth: true } // This page also requires login
    }
  ]
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isLoggedIn) {
    // If the route requires auth and the user is not logged in,
    // redirect to the login page.
    next({ name: 'login' });
  } else if (to.name === 'login' && authStore.isLoggedIn) {
    // If the user is already logged in and tries to visit the login page,
    // redirect them to the home page.
    next({ name: 'home' });
  } else {
    // Otherwise, allow the navigation.
    next();
  }
});

export default router;