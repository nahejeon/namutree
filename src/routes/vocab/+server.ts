export async function DELETE({ request, locals: { supabase } }) {
  const { ids } = await request.json();
  
  const { error } = await supabase
    .from('items')
    .delete()
    .in('id', ids);

  if (error) {
    console.error(error);
  }

  return new Response(null, { status: 204 });
}
