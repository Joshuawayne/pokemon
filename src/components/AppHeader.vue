<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
// Import our clean signOut function from the service.
import { signOut } from '../services/authService';

const authStore = useAuthStore();
const router = useRouter();

async function handleLogout() {
  try {
    await signOut();
    // After successful sign out, redirect to the login page.
    router.push({ name: 'login' });
  } catch (error) {
    // In a real app, you might show a notification here.
    console.error('Failed to log out:', error);
  }
}
</script>

<template>
  <header class="p-4 bg-red-600 shadow-md">
    <div class="container flex items-center justify-between mx-auto">
      <!-- Logo/Title -->
      <h1 class="text-2xl font-bold text-white">Pokédex</h1>

      <!-- User Info and Logout Button -->
      <div v-if="authStore.isLoggedIn" class="flex items-center space-x-4">
        <span class="text-sm text-white">{{ authStore.user?.email }}</span>
        <button @click="handleLogout" class="px-3 py-1 text-sm font-semibold text-red-600 bg-white rounded hover:bg-gray-200">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>