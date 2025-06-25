import { redirect } from '@sveltejs/kit'

import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  const { data: { user } } = await supabase.auth.getUser();
  const user_id = user?.id;

  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id);


  return { profile };
}

export const actions = {
  cancel: async () => {
    redirect(303, '/profile');
  },

  update: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();

    const { data: { user } } = await supabase.auth.getUser();

    const first_name = data.get('firstname');
    const last_name = data.get('lastname');
    const nickname = data.get('nickname');

    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id);

    const profile = profiles[0];

    if (profile) {

      const { error } = await supabase
        .from('profiles')
        .update([
          { 
            first_name, last_name, nickname
          },
        ])
        .eq('id', user.id)
        .select();

      if (error) {
        console.error(error);
      }

    } else {

      const { error } = await supabase
        .from('profiles')
        .insert([
          { 
            first_name, last_name, nickname
          },
        ])
        .select()

      if (error) {
        console.error(error);
      }

    }

    redirect(303, '/profile');
	},
} satisfies Actions;
