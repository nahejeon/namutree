import { redirect } from '@sveltejs/kit'

import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: { user } } = await supabase.auth.getUser();
  const user_id = user?.id;
  
  let { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('profile_id', user_id);

  items?.sort((a, b) => b.id - a.id);

  return { items: items ?? [] };
}

export const actions = {
	new: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();

    const name = data.get('name');
    const meaning = data.get('meaning');
    const notes = data.get('notes');

    const { data: { user } } = await supabase.auth.getUser();
    const user_id = user?.id;

    const { error } = await supabase
      .from('items')
      .insert([
        { 
          profile_id: user_id,
          name: name,
          meaning: meaning,
          notes: notes
        },
      ])
      .select();

    if (error) {
      console.error(error);
      redirect(303, '/');
    } else {
      redirect(303, '/');
    } 
	},

  update: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();

    const id = data.get('id');
    const name = data.get('name');
    const meaning = data.get('meaning');
    const notes = data.get('notes');

    const { error } = await supabase
      .from('items')
      .update([
        { 
          name: name,
          meaning: meaning,
          notes: notes
        },
      ])
      .eq('id', id)
      .select();

    if (error) {
      console.error(error);
      redirect(303, '/');
    } else {
      redirect(303, '/');
    } 
	},
} satisfies Actions;
