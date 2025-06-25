import type { Actions, LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession }, cookies, depends, params, url }) => {
  depends('folders:all');

  const { session } = await safeGetSession();

  const { data: { user } } = await supabase.auth.getUser();

  // Order
  const sort = url.searchParams.get("sort") || "newest";

  const searchString = url.searchParams.get("q");

  return {
    session,
    cookies: cookies.getAll(),
    folder_id: params.folder_id ?? '',
    sort,
    searchString
  };
}
