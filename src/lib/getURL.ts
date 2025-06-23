export function getURL({ folderId, searchString, sort, page }) {
  let url = "/";

  if (folderId) {
    url += "folder/" + folderId;
  }

  const params = new URLSearchParams();

  if (searchString) {
    if (folderId) {
      url += "/";
    }

    url += "search";

    params.append("q", searchString);
  }

  if (sort) {
    params.append("sort", sort);
  }

  if (page) {
    params.append("page", page);
  }

  const paramsString = params.toString();
  if (paramsString) {
    url += '?' + paramsString;
  }

  return url;
}
