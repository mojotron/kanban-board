import { PROJECT_FILTERS, USER_FILTERS } from '../constants/filters';

const projectFilters = [...PROJECT_FILTERS] as const;
export type ProjectFilterTypes = (typeof projectFilters)[number];

const userFilters = [...USER_FILTERS] as const;
export type UserFilerTypes = (typeof userFilters)[number];

export type SearchCollections = 'projects' | 'users';
