import { fail, redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);

      if (error.code == "user_already_exists") {
        return fail(400, { email, password, exists: true});
      } else {
        return fail(400, { email, password, otherError: true });
      }

    } else {
      redirect(303, '/profile');
    }
  },
}
