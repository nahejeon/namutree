export async function PUT({ request, params, locals: { supabase }}) {
  const { name } = await request.json();
  const folder_id = params.folder_id;

  const { error } = await supabase
    .from('folders')
    .update({ name })
    .eq('id', folder_id)
    .select()

  if (error) {
    console.error(error);
  }

  return new Response(null, { status: 204 });
};

export async function DELETE({ params, locals: { supabase }}) {
  const folder_id = params.folder_id;

  const { error } = await supabase
    .from('folders')
    .delete()
    .eq('id', folder_id)
    .select();

  if (error) {
    console.error(error);
  }

  return new Response(null, { status: 204 });
};
