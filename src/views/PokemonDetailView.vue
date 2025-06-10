<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// We'll reuse our existing service, demonstrating good code reuse.
import { getPokemonDetails } from '../services/pokemonService';

// --- Hooks ---
// useRoute() gives us access to the current route object, including parameters.
const route = useRoute();
// useRouter() gives us access to the router instance for navigation.
const router = useRouter();

// --- State Management ---
// A ref to hold the full Pokémon object once fetched.
const pokemon = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Get the Pokémon's name from the URL parameter we defined in our router.
const pokemonName = route.params.name;

// --- Lifecycle Hooks ---
onMounted(async () => {
  try {
    // Fetch the specific details for this Pokémon.
    pokemon.value = await getPokemonDetails(pokemonName);
  } catch (err) {
    // If the Pokémon name is invalid or the API fails, we'll show an error.
    error.value = `Could not find data for ${pokemonName}.`;
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

/**
 * A simple utility function to format stat names for display.
 * This is a good example of a small helper function that keeps the template clean.
 * @param {string} statName - The stat name from the API (e.g., 'special-attack').
 * @returns {string} - The formatted stat name (e.g., 'Sp. Atk').
 */
function formatStatName(statName) {
  return statName
    .split('-')
    .map(word => (word.length > 2 ? word.charAt(0).toUpperCase() + '.' : word))
    .join(' ');
}
</script>

<template>
  <main class="container p-4 mx-auto">
    <!-- A "Back" button for good user experience. -->
    <button @click="router.back()" class="mb-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
      ← Back to Pokédex
    </button>

    <!-- 1. Loading State -->
    <div v-if="isLoading" class="text-center">
      <p class="text-lg">Analyzing Pokémon data...</p>
    </div>

    <!-- 2. Error State -->
    <div v-else-if="error" class="p-4 text-center text-red-700 bg-red-100 rounded-lg">
      <p class="font-bold">An Error Occurred</p>
      <p>{{ error }}</p>
    </div>

    <!-- 3. Success State: Display the Pokémon details -->
    <div v-else-if="pokemon" class="p-6 bg-white border rounded-lg shadow-lg">
      <!-- Header Section: Name and ID -->
      <div class="flex flex-col items-center mb-6 text-center">
        <h1 class="text-5xl font-bold capitalize">{{ pokemon.name }}</h1>
        <span class="text-2xl text-gray-500">#{{ String(pokemon.id).padStart(3, '0') }}</span>
      </div>

      <!-- Main Content: Image, Types, and Stats -->
      <div class="grid gap-8 md:grid-cols-2">
        <!-- Left Side: Image -->
        <div class="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
          <img :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" class="w-64 h-64" />
        </div>
        
        <!-- Right Side: Info -->
        <div class="space-y-6">
          <!-- Types -->
          <div>
            <h2 class="mb-2 text-2xl font-semibold">Type</h2>
            <div class="flex space-x-2">
              <span
                v-for="typeInfo in pokemon.types"
                :key="typeInfo.type.name"
                class="px-4 py-1 text-white capitalize rounded-full"
                :class="`bg-${typeInfo.type.name}`" 
                :style="{ backgroundColor: `var(--color-${typeInfo.type.name})` }"
              >
                {{ typeInfo.type.name }}
              </span>
            </div>
          </div>
          
          <!-- Stats -->
          <div>
            <h2 class="mb-2 text-2xl font-semibold">Base Stats</h2>
            <ul class="space-y-2">
              <li v-for="statInfo in pokemon.stats" :key="statInfo.stat.name" class="flex items-center">
                <span class="w-1/3 text-gray-600 capitalize">{{ formatStatName(statInfo.stat.name) }}</span>
                <span class="w-16 font-bold text-right">{{ statInfo.base_stat }}</span>
                <div class="w-2/3 ml-4 bg-gray-200 rounded-full h-4">
                  <div class="h-4 rounded-full bg-green-500" :style="{ width: `${(statInfo.base_stat / 255) * 100}%` }"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>