import { createClient } from '@supabase/supabase-js';
import { useAuthStore } from '../stores/authStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// NEW: Listen for authentication state changes
supabase.auth.onAuthStateChange((event, session) => {
  const authStore = useAuthStore();
  // On SIGNED_IN or INITIAL_SESSION, set the user.
  // On SIGNED_OUT, user will be null.
  authStore.setUser(session?.user || null);
});

// NEW: Sign in function
export async function signInWithPassword(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    // This makes sure we throw an error to be caught by the component
    throw new Error(error.message);
  }
  return data;
}

// NEW: Sign out function
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}