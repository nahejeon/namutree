import { redirect } from "@sveltejs/kit";

import { demoFolders, demoItems } from "$lib/demoData"

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase }, url, cookies }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  if (!user && !cookies.get("visited")) {
    const {
      data: { user },
    } = await supabase.auth.signInAnonymously()

    const { data: folders } = await supabase
      .from("folders")
      .insert(demoFolders(user.id))
      .select("*")

    const folderIds = folders.map((f) => f.id)

    await supabase
      .from("items")
      .insert(demoItems(user.id, folderIds))
      .select("*")

  } else if (user && !cookies.get("visited")) {
    cookies.set("visited", "true", { path: "/" })
  }

  // Get count
  const { count, error } = await supabase
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user_id);

  // Pagination
  const page = url.searchParams.get("page") || "1";

  const start = page == "1" ? 0 : 20 * (page - 1) - 1;
  const end = page == "1" ? 18 : 20 * page - 2;

  // Order
  const sort = url.searchParams.get("sort") || "newest";

  if (sort == "random") {
    let { data: items } = await supabase.rpc("get_random_items");

    return { items: items ?? [], count, page, sort };
  }

  const sortColumn = ["newest", "oldest"].includes(sort) ? "id" : "name";
  const ascending = sort == "newest" ? false : true;

  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("profile_id", user_id)
    .order(sortColumn, { ascending })
    .range(start, end);

  return { items: items ?? [], count, page, sort };
};

export const actions = {
  new: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();

    const name = data.get("name");
    const meaning = data.get("meaning");
    const notes = data.get("notes");
    const folderId = data.get("folder_id");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("items")
      .insert([
        {
          profile_id: user?.id,
          name: name,
          meaning: meaning,
          notes: notes,
          folder_id: folderId || null,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      redirect(303, "/");
    } else {
      redirect(303, "/");
    }
  },

  update: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();

    const id = data.get("id");
    const name = data.get("name");
    const meaning = data.get("meaning");
    const notes = data.get("notes");
    const folderId = data.get("folder_id");

    const { error } = await supabase
      .from("items")
      .update([
        {
          name: name,
          meaning: meaning,
          notes: notes,
          folder_id: folderId || null,
        },
      ])
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      redirect(303, "/");
    } else {
      redirect(303, "/");
    }
  },
} satisfies Actions;
