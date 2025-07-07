export async function PUT({ request, locals: { supabase } }) {
  const { folder_id, ids } = await request.json();

  const { error } = await supabase
    .from("items")
    .update({ folder_id })
    .in("id", ids)
    .select();

  if (error) {
    console.error(error);
  }

  return new Response(null, { status: 204 });
}

export async function DELETE({ request, locals: { supabase } }) {
  const { ids } = await request.json();

  const { error } = await supabase.from("items").delete().in("id", ids);

  if (error) {
    console.error(error);
  }

  return new Response(null, { status: 204 });
}
