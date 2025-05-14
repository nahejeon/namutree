import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession }, cookies }) => {
  const { session } = await safeGetSession();

  if (!session) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error(error);
    }
  }

  return {
    session,
    cookies: cookies.getAll(),
  };
}
