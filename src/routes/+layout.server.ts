import type { Actions, LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession }, cookies, depends, params, url }) => {
  depends('folders:all');

  const { session } = await safeGetSession();

  if (!session) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error(error);
    }
  }

  const { data: { user } } = await supabase.auth.getUser();

  // Order
  const sort = url.searchParams.get("sort") || "newest";

  return {
    session,
    cookies: cookies.getAll(),
    folder_id: params.folder_id ?? '',
    sort
  };
}
