import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
  const items = data.items;
  const count = data.count;
  const page = data.page;

	return { items, count, page };
};
