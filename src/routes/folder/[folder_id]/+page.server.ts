import { redirect } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase }, params: { folder_id } }) => {
  const { data: { user } } = await supabase.auth.getUser();
  const user_id = user?.id;
  
  let { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('profile_id', user_id)
    .eq('folder_id', folder_id);

  items?.sort((a, b) => b.id - a.id);

  return { items: items ?? [], folder_id };
}
