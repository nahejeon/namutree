import { fail, redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) {
      return fail(400, { email, password, missing: true });
    }

    if (!password) {
      return fail(400, { email, password, missing: true });
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
      return fail(400, { email, password, incorrect: true });

    } else {
      redirect(303, '/');
    }
  },

  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) {
      return fail(400, { email, password, missing: true });
    }

    if (!password) {
      return fail(400, { email, password, missing: true });
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
      return fail(400, { email, password, incorrect: true, code: error.code });

    } else {
      redirect(303, '/profile');
    }
  },
}
