import type { Actions, LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession }, cookies, depends }) => {
  depends('folders:all');

  const { session } = await safeGetSession();

  if (!session) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error(error);
    }
  }

  const { data: { user } } = await supabase.auth.getUser();

  let { data: folders } = await supabase
    .from('folders')
    .select('*')
    .eq('profile_id', user?.id);

  return {
    session,
    cookies: cookies.getAll(),
    folders: folders ?? [], 
  };
}
