import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
	return {
    items: data.items
  };
};
