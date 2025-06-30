import { redirect } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user && !user.is_anonymous) {
    redirect(307, '/');
  }
}
