import supabase from "./supabase"; // Importing Supabase client

/**
 * Sign in with email and password.
 * @param {Object} credentials - Object containing email and password.
 * @throws {Error} If there is an error during sign in.
 * @returns {Object} Data from sign in API.
 */
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Get current user session.
 * @throws {Error} If there is an error during session retrieval.
 * @returns {Object|null} User session or null if there is no active session.
 */
export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}

/**
 * Sign up with email, password, name and profile picture.
 * @param {Object} credentials - Object containing email, password, name and profile picture.
 * @throws {Error} If there is an error during sign up.
 * @returns {Object} Data from sign up API.
 */
export async function signup({ name, email, password, profile_pic }) {
  // Generate a unique file name for the profile picture
  const fileName = `dp-${name.split(" ").join("-")}-${Math.round(
    Math.random()
  )}`;

  // Upload the profile picture to Supabase storage
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  // Sign up with email, password and additional user data
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `https://wingshucgaospprtixjt.supabase.co/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Sign out from the current session.
 * @throws {Error} If there is an error during sign out.
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
