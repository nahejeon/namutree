import { fail, redirect } from '@sveltejs/kit'

import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: colors } = await supabase.from('colors').select('name').limit(5).order('name')
  return { colors: colors ?? [] }
}

export const actions = {
	new: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const name = data.get('name')
    const meaning = data.get('meaning')
    const notes = data.get('notes')

    const { data: { user } } = await supabase.auth.getUser()
    const user_id = user?.id

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
      .select()

    if (error) {
      console.error(error)
      redirect(303, '/')
    } else {
      redirect(303, '/')
    } 
	}
} satisfies Actions;
