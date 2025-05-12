export async function DELETE({ params, locals: { supabase } }) {
	const vocab_id = params.vocab_id;

  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', vocab_id)
    .select();

  if (error) {
    console.error(error);
  }

  return new Response(null, { status: 204 });
}
