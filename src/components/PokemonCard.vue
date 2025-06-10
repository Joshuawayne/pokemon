<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// --- Props ---
// This component accepts a 'pokemon' object as a prop from its parent.
// This follows the principle of one-way data flow.
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});

// --- State for 3D/Holo Effect ---
// These refs will hold the calculated values for our CSS transforms and gradients.
const cardRef = ref(null); // A reference to the card's root DOM element.
const rotateX = ref(0);
const rotateY = ref(0);
const glareX = ref(50);
const glareY = ref(50);
const glareOpacity = ref(0);
const backgroundX = ref(50);
const backgroundY = ref(50);

// --- Computed Property for Reactive Styling ---
// This is the core of the effect. It creates a style object that Vue will
// reactively apply to the card's DOM element. When our refs change,
// these CSS Custom Properties are updated automatically.
const cardStyle = computed(() => ({
  '--rotate-x': `${rotateX.value}deg`,
  '--rotate-y': `${rotateY.value}deg`,
  '--glare-x': `${glareX.value}%`,
  '--glare-y': `${glareY.value}%`,
  '--glare-opacity': glareOpacity.value,
  '--background-x': `${backgroundX.value}%`,
  '--background-y': `${backgroundY.value}%`,
}));

// --- Event Handlers ---
/**
 * Handles the mouse moving over the card.
 * This function calculates the mouse position relative to the card's center
 * and updates the reactive state to drive the CSS animations.
 * @param {MouseEvent} event - The native mouse event.
 */
function handleMouseMove(event) {
  if (!cardRef.value) return;

  const rect = cardRef.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Calculate rotation values. We map the mouse position to a rotation
  // range, e.g., from -15 to 15 degrees.
  const x = (mouseX - rect.width / 2) / (rect.width / 2);
  const y = (mouseY - rect.height / 2) / (rect.height / 2);
  rotateY.value = x * 15;
  rotateX.value = -y * 15;

  // Update positions for the glare and background effects.
  glareX.value = (mouseX / rect.width) * 100;
  glareY.value = (mouseY / rect.height) * 100;
  backgroundX.value = (mouseX / rect.width) * 50 + 25; // Constrain to 25-75%
  backgroundY.value = (mouseY / rect.height) * 50 + 25; // Constrain to 25-75%
  glareOpacity.value = 1;
}

/**
 * Resets all transform and gradient values when the mouse leaves the card,
 * smoothly returning it to its resting state.
 */
function handleMouseLeave() {
  rotateX.value = 0;
  rotateY.value = 0;
  glareOpacity.value = 0;
}

// --- Data Fetching for Image ---
// We need the Pokémon's ID to construct the image URL.
// The name comes from the list API, but the ID and sprite come from the details.
// This is a simplified approach for the card.
const pokemonId = computed(() => {
    // Extract ID from the URL provided by the list API.
    const parts = props.pokemon.url.split('/');
    return parts[parts.length - 2];
});

const imageUrl = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId.value}.png`;
});
</script>

<template>
  <RouterLink :to="{ name: 'pokemon-detail', params: { name: pokemon.name } }">
    <div
      ref="cardRef"
      class="pokemon-card"
      :style="cardStyle"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="card-content">
        <img :src="imageUrl" :alt="pokemon.name" class="pokemon-image" />
        <h3 class="pokemon-name">{{ pokemon.name }}</h3>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
/*
  This CSS is the other half of the magic. It uses the CSS Custom Properties
  (variables like --rotate-x) that our script is updating.
*/
.pokemon-card {
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --glare-x: 50%;
  --glare-y: 50%;
  --glare-opacity: 0;
  --background-x: 50%;
  --background-y: 50%;

  position: relative;
  background: #2d3748; /* A dark, neutral background */
  border-radius: 15px;
  color: white;
  padding: 1rem;
  text-align: center;
  overflow: hidden; /* Important for containing the pseudo-elements */
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out; /* Smooths out mouse leave event */
  transform: perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* This pseudo-element creates the holo/glare effect */
.pokemon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--glare-x) var(--glare-y),
    rgba(255, 255, 255, 0.4),
    transparent 40%
  );
  opacity: var(--glare-opacity);
  transition: opacity 0.5s ease;
  z-index: 2;
}

/* This pseudo-element creates the shimmering background effect */
.pokemon-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background-image: linear-gradient(
    115deg,
    transparent 20%,
    rgba(147, 197, 253, 0.2) 36%,
    rgba(192, 132, 252, 0.3) 45%,
    rgba(147, 197, 253, 0.2) 54%,
    transparent 70%
  );
  background-size: 200% 200%;
  background-position: var(--background-x) var(--background-y);
  z-index: 1;
  transition: background-position 0.1s ease-out;
}

.card-content {
  position: relative; /* Ensures content is on top of the ::after pseudo-element */
  z-index: 3;
}

.pokemon-image {
  width: 96px;
  height: 96px;
  margin: 0 auto 0.5rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
  /* Prevents the image from being dragged, for a better UX */
  -webkit-user-drag: none;
  user-select: none;
}

.pokemon-name {
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: capitalize;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
</style>