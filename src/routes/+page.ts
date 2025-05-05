import type { PageLoad } from './$types';

export const load: PageLoad = ({}) => {
	return {
    vocab_list: [
      {
        word: `here`,
        meaning: `여기`,
      },
      {
        word: `now`,
        meaning: `지금`,
      },
      {
        word: `potato`,
        meaning: `감자`,
      }
    ]
  }
};
