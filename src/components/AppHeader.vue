<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { signOut } from '../services/authService';

// We need the router for navigation.
const router = useRouter();
// We need the authStore to reactively display user info in the template.
const authStore = useAuthStore();

/**
 * Handles the user logout process.
 * It calls the signOut service, and on success, redirects the user to the login page.
 */
async function handleLogout() {
  try {
    await signOut();
    
    // Using router.replace is slightly better for login/logout
    // as it prevents the user from clicking the browser's "back" button
    // and returning to the authenticated page.
    router.replace({ name: 'login' });

  } catch (error) {
    alert(`Error logging out: ${error.message}`);
    console.error('Failed to log out:', error);
  }
}
</script>

<template>
  <header class="p-4 bg-red-600 shadow-md">
    <div class="container flex items-center justify-between mx-auto">
      <h1 class="text-2xl font-bold text-white">Pokédex</h1>
      
      <!-- This v-if is crucial. It ensures this section only renders
           when the user is actually logged in, based on our reactive Pinia store. -->
      <div v-if="authStore.isLoggedIn" class="flex items-center space-x-4">
        <span class="text-sm text-white">{{ authStore.user?.email }}</span>
        <button @click="handleLogout" class="px-3 py-1 text-sm font-semibold text-red-600 bg-white rounded hover:bg-gray-200">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
