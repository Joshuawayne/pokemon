<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import SplashScreen from './components/SplashScreen.vue';

// A reactive flag to control the splash screen's visibility.
const showSplash = ref(true);

// This function will be called by the SplashScreen component when it's done.
function onSplashCompleted() {
  // Set the flag to false to hide the splash screen.
  showSplash.value = false;
  // Use sessionStorage to "remember" that we've shown the splash screen.
  // This prevents it from re-appearing on page refresh.
  // sessionStorage is cleared when the browser tab is closed.
  sessionStorage.setItem('splashShown', 'true');
}

// On initial load, check if we've already shown the splash screen in this session.
if (sessionStorage.getItem('splashShown')) {
  showSplash.value = false;
}
</script>

<template>
  <!-- Conditionally render the SplashScreen using v-if -->
  <SplashScreen v-if="showSplash" @completed="onSplashCompleted" />
  <!-- The rest of the app is only rendered after the splash screen is hidden -->
  <RouterView v-else />
</template>