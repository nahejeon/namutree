import type { LayoutServerLoad } from "./$types"
import { error } from '@sveltejs/kit'

import { demoFolders, demoItems } from "$lib/demoData"

export const load: LayoutServerLoad = async ({
  locals: { supabase, safeGetSession },
  cookies,
  depends,
  params,
  url,
}) => {
  depends("folders:all")

  const {
    data: { user },
  } = await supabase.auth.getUser()



  const { session } = await safeGetSession()

  // Order
  const sort = url.searchParams.get("sort") || "newest"

  const searchString = url.searchParams.get("q")

  return {
    session,
    cookies: cookies.getAll(),
    folder_id: params.folder_id ?? "",
    sort,
    searchString,
  }
};
