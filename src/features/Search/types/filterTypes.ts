// const projectFilters = [...PROJECT_FILTERS] as const;
// export type ProjectFilterTypes = (typeof projectFilters)[number];

import { SEARCH_COLLECTION } from '../constants/filters';

// const userFilters = [...USER_FILTERS] as const;
// export type UserFilerTypes = (typeof userFilters)[number];

const searchCollections = [...SEARCH_COLLECTION] as const;

export type SearchCollections = (typeof searchCollections)[number];
