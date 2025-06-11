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
