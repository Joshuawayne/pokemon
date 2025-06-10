/**
 * A pure utility function that capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The capitalized string, or an empty string if the input is invalid.
 */
export function capitalize(str) {
    // Guard clause for invalid input, returning a predictable value.
    if (!str || typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }