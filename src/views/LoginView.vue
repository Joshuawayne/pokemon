<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// We will create the signInWithPassword function in authService next
import { signInWithPassword } from '../services/authService';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref(null);
const isLoading = ref(false);

async function handleLogin() {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    await signInWithPassword(email.value, password.value);
    // On successful login, Supabase's onAuthStateChange will trigger,
    // and our route guard will redirect us. But we can also push manually.
    router.push('/');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Trainer Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
        <div v-if="errorMessage" class="p-3 text-sm text-center text-red-800 bg-red-100 rounded-md">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>