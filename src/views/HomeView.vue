<script setup>
import { ref, onMounted, computed } from 'vue';
import PokemonCard from '../components/PokemonCard.vue';
// Import our clean, dedicated service function.
import { getPokemonList } from '../services/pokemonService';
// Import the header component to use in this view.
import AppHeader from '../components/AppHeader.vue';

// --- State Management ---
// A ref to hold the array of Pokémon we fetch.
const pokemonList = ref([]);
// A ref to manage the loading state for a better user experience.
const isLoading = ref(true);
// A ref to hold any potential error messages.
const error = ref(null);

// NEW: A ref to hold the user's search input.
// It's a "ref" because it's a piece of reactive state that can change.
const searchText = ref('');

// --- Computed Properties ---
// A computed property is a value that is derived from other reactive state.
// It will automatically re-calculate whenever its dependencies (searchText or pokemonList) change.
// This is the most efficient and declarative way to create a filtered list in Vue.
const filteredPokemon = computed(() => {
  // If there's no search text, return the full list.
  if (!searchText.value) {
    return pokemonList.value;
  }
  // Otherwise, filter the list.
  // We convert both the Pokémon name and the search text to lowercase
  // to ensure the search is case-insensitive.
  return pokemonList.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

// --- Lifecycle Hooks ---
onMounted(async () => {
  try {
    pokemonList.value = await getPokemonList(151);
  } catch (err) {
    error.value = 'Failed to load Pokémon. Please try again later.';
    console.error(err); // Keep the detailed error for developers.
  } finally {
    // This always runs, ensuring the loading spinner is hidden
    // whether the request succeeded or failed.
    isLoading.value = false;
  }
});
</script>

<template>
  <!-- The AppHeader is included here to be part of the layout for this view. -->
  <AppHeader />

  <main class="container p-4 mx-auto">
    <!-- Search Input Field -->
    <div class="mb-6">
      <!-- 
        ===============================================================
        UPDATE: The <input> tag below has been fixed.
        HOW: A forward slash "/" was added before the closing ">".
        WHY: In Vue templates, all tags must be explicitly closed.
             Tags like <input>, <img>, and <br> that don't have content
             are called "self-closing" tags and must end with "/>".
             The original code was missing this, causing a compiler error.
        ===============================================================
      -->
      <input
        type="text"
        v-model="searchText"
        placeholder="Search for a Pokémon..."
        class="w-full max-w-sm px-4 py-2 border rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- 1. Loading State -->
    <div v-if="isLoading" class="text-center">
      <p class="text-lg">Scanning for Pokémon...</p>
    </div>

    <!-- 2. Error State -->
    <div v-else-if="error" class="text-center text-red-700 bg-red-100 rounded-lg">
      <p class="font-bold">An Error Occurred</p>
      <p>{{ error }}</p>
    </div>

    <!-- 3. Success State -->
    <div v-else>
      <!-- A message to show when the filter results in an empty list -->
      <div v-if="filteredPokemon.length === 0" class="text-center text-gray-500">
        <p class="text-xl">No Pokémon found for "{{ searchText }}"</p>
      </div>

 <div v-else class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  <!-- We now loop and render a PokemonCard for each item -->
  <PokemonCard 
    v-for="pokemon in filteredPokemon"
    :key="pokemon.name"
    :pokemon="pokemon" 
  />
</div>
    </div>
  </main>
</template>