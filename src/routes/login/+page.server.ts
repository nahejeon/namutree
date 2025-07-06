import { fail, redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      return fail(400, { email, password, incorrect: true });

    } else {
      redirect(303, '/');
    }
  },

  resetPassword: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://namutree.io/profile/update-password',
    })

    if (error) {
      console.error(error);
      return fail(400, { email, resetFail: true });

    } else {
      return { resetSent: true };
    }
  },
}
