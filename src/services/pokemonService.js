// A descriptive name for our API's base URL.
// Using a constant makes it easy to change if the API ever moves.
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches a paginated list of Pokémon from the PokéAPI.
 * This function now returns both the results for the current page
 * and the total count of all Pokémon for pagination purposes.
 *
 * @param {number} limit - The number of Pokémon to fetch.
 * @param {number} offset - The starting point in the Pokémon list.
 * @returns {Promise<{results: Array, count: number}>} A promise that resolves to an object.
 * @throws {Error} If the network request fails.
 */
export async function getPokemonList(limit = 20, offset = 0) {
  // Construct the full URL for the API request.
  const url = `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(url);
    
    // A robust check to ensure the request was successful (status 200-299).
    if (!response.ok) {
      // Throwing an error with a meaningful message is better than returning null.
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // ===============================================================
    // UPDATE: Return an object with both results and the total count.
    // This gives our components all the information they need for pagination.
    // ===============================================================
    return {
      results: data.results,
      count: data.count
    };

  } catch (error) {
    // Log the detailed error for debugging purposes.
    console.error('Failed to fetch Pokémon list:', error);
    // Re-throw the error so the calling component knows something went wrong
    // and can update the UI accordingly.
    throw error;
  }
}

/**
 * Fetches detailed information for a single Pokémon.
 * (This function has not been changed).
 *
 * @param {string} name - The name of the Pokémon to fetch.
 * @returns {Promise<Object>} A promise that resolves to the detailed Pokémon object.
 * @throws {Error} If the network request fails.
 */
export async function getPokemonDetails(name) {
  // It's good practice to validate inputs to prevent unnecessary API calls.
  if (!name) {
    throw new Error('Pokémon name is required.');
  }

  const url = `${POKEAPI_BASE_URL}/pokemon/${name}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for ${name}. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    throw error;
  }
}