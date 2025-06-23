import { redirect } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase }, params: { folder_id }, url }) => {
  const { data: { user } } = await supabase.auth.getUser();
  const user_id = user?.id;

  // Get count
  const { count, error } = await supabase
    .from('items')
    .select('*', { count: 'exact', head: true })
    .eq('profile_id', user_id)
    .eq('folder_id', folder_id);


  // Pagination
  const page = url.searchParams.get("page") || '1';

  const start = page == '1' ? 0 : 20 * (page - 1) - 1;
  const end = page == '1' ? 18 : 20 * page - 2;
  
  let { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('profile_id', user_id)
    .eq('folder_id', folder_id)
    .order('id', { ascending: false })
    .range(start, end);

  return { items, count, page, folder_id };
}

export const actions = {
  new: async ({ request, locals: { supabase }, url }) => {
    console.log(url);

    const data = await request.formData();

    const name = data.get('name');
    const meaning = data.get('meaning');
    const notes = data.get('notes');
    const folderId = data.get('folder_id');

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('items')
      .insert([
        { 
          profile_id: user?.id,
          name: name,
          meaning: meaning,
          notes: notes,
          folder_id: folderId || null
        },
      ])
      .select();

    if (error) {
      console.error(error);
      redirect(303, url.pathname);
    } else {
      redirect(303, url.pathname);
    } 
  },

  update: async ({ request, locals: { supabase }, url }) => {
    const data = await request.formData();

    const id = data.get('id');
    const name = data.get('name');
    const meaning = data.get('meaning');
    const notes = data.get('notes');
    const folderId = data.get('folder_id');

    const { error } = await supabase
      .from('items')
      .update([
        { 
          name: name,
          meaning: meaning,
          notes: notes,
          folder_id: folderId || null
        },
      ])
      .eq('id', id)
      .select();

    if (error) {
      console.error(error);
      redirect(303, url.pathname);
    } else {
      redirect(303, url.pathname);
    } 
  },
} satisfies Actions;
