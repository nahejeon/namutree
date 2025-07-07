import { redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
  const searchString = url.searchParams.get("q");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  // Get count
  const { count, error } = await supabase
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user_id)
    .ilike("all_text", `%${searchString}%`);

  // Pagination
  const page = url.searchParams.get("page") || "1";

  const start = 20 * (page - 1);
  const end = 20 * page - 1;

  // Order
  const sort = url.searchParams.get("sort") || "newest";
  const sortColumn = ["newest", "oldest"].includes(sort) ? "id" : "name";
  const ascending = sort == "newest" ? false : true;

  const { data: items } = await supabase
    .from("items")
    .select("*")
    .eq("profile_id", user_id)
    .ilike("all_text", `%${searchString}%`)
    .order(sortColumn, { ascending })
    .range(start, end);

  return { items, count, page, searchString, sort, searchString };
};
