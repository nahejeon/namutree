import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const { name } = await request.json();

	const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('folders')
    .insert([
      { profile_id: user?.id, name }
    ])
    .select();

  if (error) {
  	console.error(error);
  }

	return new Response(201);
};
