// Import necessary functions from Vitest
import { describe, it, expect } from 'vitest';

// Import the function we want to test
import { capitalize } from './formatter.js';

// `describe` creates a test suite, a logical grouping for related tests.
describe('capitalize', () => {
  // `it` defines an individual test case. The description should
  // clearly state what behavior is being tested.

  it('should capitalize the first letter of a lowercase string', () => {
    // Arrange: Define the input
    const input = 'pikachu';
    
    // Act: Call the function
    const result = capitalize(input);
    
    // Assert: Check if the output is what we expect
    expect(result).toBe('Pikachu');
  });

  it('should return an already capitalized string unchanged', () => {
    const input = 'Charizard';
    const result = capitalize(input);
    expect(result).toBe('Charizard');
  });

  it('should handle single-letter strings', () => {
    const input = 'a';
    const result = capitalize(input);
    expect(result).toBe('A');
  });

  it('should return an empty string if the input is an empty string', () => {
    const input = '';
    const result = capitalize(input);
    expect(result).toBe('');
  });

  // Testing edge cases is a sign of a thorough developer.
  it('should return an empty string for null or undefined input', () => {
    expect(capitalize(null)).toBe('');
    expect(capitalize(undefined)).toBe('');
  });

  it('should return an empty string for non-string inputs', () => {
    expect(capitalize(123)).toBe('');
    expect(capitalize({})).toBe('');
    expect(capitalize([])).toBe('');
  });
});