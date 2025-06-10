import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/main.css'; // Your Tailwind styles

// Import the auth store
import { useAuthStore } from './stores/authStore';

const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance

app.use(pinia); // Use Pinia

// Get the auth store and check the session BEFORE mounting the app
const authStore = useAuthStore();
authStore.checkUserSession().then(() => {
  // Now that we know the user's status, mount the app
  app.use(router);
  app.mount('#app');
});