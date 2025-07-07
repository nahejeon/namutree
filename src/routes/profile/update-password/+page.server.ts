import { fail } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  if (url.searchParams.get("error")) {
    return { invalid: true };
  }
};

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error(error);
      return fail(400, { email, password, incorrect: true });
    } else {
      return { success: true };
    }
  },
} satisfies Actions;
