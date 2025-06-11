export async function POST({ request, locals: { supabase } }) {
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

	return new Response( { status: 201 });
};
