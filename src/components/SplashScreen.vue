<script setup>
import { onMounted } from 'vue';

// defineEmits declares the custom events this component can send to its parent.
// This is the proper way for a child to communicate "upwards".
const emit = defineEmits(['completed']);

/**
 * A "command" function that signals the completion of the splash screen sequence.
 */
function finishSplash() {
  emit('completed');
}

// After the component is mounted, we set a timer.
// This ensures the splash screen doesn't stay forever if the user doesn't click.
onMounted(() => {
  // Automatically complete after 4 seconds as a fallback.
  setTimeout(finishSplash, 4000);
});
</script>

<template>
  <!-- The @click listener makes the whole screen a button to enter the app. -->
  <div @click="finishSplash" class="splash-screen">
    <div class="splash-content">
      <!-- Using a high-quality, transparent PNG for the logo looks best. -->
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
        alt="Pokémon Logo"
        class="splash-logo"
      />
      <h2 class="splash-text">Your Pokédex is starting up...</h2>
      <p class="click-text">Click anywhere to begin</p>
    </div>
  </div>
</template>

<style scoped>
/* "scoped" ensures these styles ONLY apply to SplashScreen.vue */
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  animation: fadeIn 0.5s ease-in-out;
}

.splash-content {
  text-align: center;
  color: white;
}

.splash-logo {
  width: 80%;
  max-width: 400px;
  margin-bottom: 2rem;
  animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards;
  opacity: 0;
  transform: scale(0.8);
}

.splash-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  animation: slideUp 0.6s ease-out 0.8s forwards;
  opacity: 0;
}

.click-text {
  font-size: 1rem;
  color: #aaa;
  animation: fadeIn 1s ease-in-out 1.5s forwards;
  opacity: 0;
}

/* --- Keyframe Animations for a dynamic feel --- */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>