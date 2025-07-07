import type { Actions, LayoutServerLoad } from "./$types";

import { demoFolders, demoItems } from "$lib/demoData.ts";

export const load: LayoutServerLoad = async ({
  locals: { supabase, safeGetSession },
  cookies,
  depends,
  params,
  url,
}) => {
  depends("folders:all");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !cookies.get("visited")) {
    const {
      data: { user },
      userError,
    } = await supabase.auth.signInAnonymously();

    const { data: folders, error } = await supabase
      .from("folders")
      .insert(demoFolders(user.id))
      .select("*");

    const folderIds = folders.map((f) => f.id);

    const { data: items, itemsError } = await supabase
      .from("items")
      .insert(demoItems(user.id, folderIds))
      .select("*");

    location.reload();
  } else if (user && !cookies.get("visited")) {
    cookies.set("visited", "true", { path: "/" });
  }

  const { session } = await safeGetSession();

  // Order
  const sort = url.searchParams.get("sort") || "newest";

  const searchString = url.searchParams.get("q");

  return {
    session,
    cookies: cookies.getAll(),
    folder_id: params.folder_id ?? "",
    sort,
    searchString,
  };
};
