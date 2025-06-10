import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../services/authService'; // We'll add functions to authService later

export const useAuthStore = defineStore('auth', () => {
  // The user object from Supabase. Starts as null.
  const user = ref(null);

  // A boolean to easily check if the user is logged in.
  const isLoggedIn = ref(false);

  // Function to set the user and update isLoggedIn status.
  // This will be called from our authService.
  function setUser(newUser) {
    user.value = newUser;
    isLoggedIn.value = !!newUser; // Sets to true if user is not null, false otherwise.
  }
  
  // Check for user session on initial load
  async function checkUserSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      setUser(data.session.user);
    } else {
      setUser(null);
    }
  }

  return {
    user,
    isLoggedIn,
    setUser,
    checkUserSession,
  };
});