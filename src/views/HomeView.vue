<script setup>
import { ref, onMounted, computed } from 'vue';
import { getPokemonList } from '../services/pokemonService';
import AppHeader from '../components/AppHeader.vue';
import PokemonCard from '../components/PokemonCard.vue';
//import PokemonCardSkeleton from '../components/PokemonCardSkeleton.vue'; // We'll add this next

// --- State Management ---
const pokemonList = ref([]);
const isLoading = ref(true);
const error = ref(null);
const searchText = ref('');

// --- Pagination State ---
const POKEMON_PER_PAGE = 24;
const currentPage = ref(1);
const totalPokemon = ref(0);

// --- Computed Properties ---
// Computes the total number of pages needed.
const totalPages = computed(() => {
  if (totalPokemon.value === 0) return 1;
  // Math.ceil rounds up to ensure we have a page for any remaining Pokémon.
  return Math.ceil(totalPokemon.value / POKEMON_PER_PAGE);
});

// The filtered list now only operates on the current page's data.
const filteredPokemon = computed(() => {
  if (!searchText.value) {
    return pokemonList.value;
  }
  return pokemonList.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

// --- Data Fetching Logic ---
/**
 * A reusable function to fetch Pokémon for a specific page.
 * This centralizes our data fetching logic and state updates.
 */
async function fetchPaginatedPokemon(page) {
  // Guard clause: Don't fetch if the page is out of bounds.
  if (page < 1 || (page > totalPages.value && totalPages.value > 0)) {
    return;
  }
  
  isLoading.value = true;
  error.value = null;

  try {
    // Calculate the offset for the API call based on the page number.
    const offset = (page - 1) * POKEMON_PER_PAGE;
    const data = await getPokemonList(POKEMON_PER_PAGE, offset);
    
    pokemonList.value = data.results;
    totalPokemon.value = data.count;
    currentPage.value = page; // Update current page only on successful fetch

  } catch (err) {
    error.value = 'Failed to load Pokémon. Please try again later.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

// --- Navigation Functions ---
function nextPage() {
  fetchPaginatedPokemon(currentPage.value + 1);
}

function previousPage() {
  fetchPaginatedPokemon(currentPage.value - 1);
}

// --- Lifecycle Hooks ---
// onMounted now has a single, clear responsibility: kick off the initial fetch.
onMounted(() => {
  fetchPaginatedPokemon(1); // Fetch the first page on load.
});
</script>

<template>
  <AppHeader />

  <main class="container p-4 mx-auto">
    <!-- Search Input Field -->
    <div class="mb-6">
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

      <!-- Grid of Pokémon cards -->
      <div v-else class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <PokemonCard 
          v-for="pokemon in filteredPokemon"
          :key="pokemon.name"
          :pokemon="pokemon" 
        />
      </div>
    </div>

    <!-- Pagination Controls Section -->
    <div v-if="!isLoading && !error" class="flex items-center justify-center mt-8 space-x-4">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 font-bold text-white bg-blue-600 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        ← Previous
      </button>
      
      <span class="text-lg font-semibold">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 font-bold text-white bg-blue-600 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        Next →
      </button>
    </div>
  </main>
</template>