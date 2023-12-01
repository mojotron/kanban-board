export const PROJECT_FILTERS: ['latest', 'user', 'tag', 'name'] = [
  'latest',
  'user',
  'tag',
  'name',
];

export const USER_FILTERS: ['username', 'tasks', 'projects'] = [
  'username',
  'tasks',
  'projects',
];
// PROJECTS
// - default project => get latest projects with public sat on
// - search by tag
// - search by name
// - search by username
// default user => latest up for work se on
// - search by userName
// - search by tag
// - search by project

export const SEARCH_FILTERS = {
  project: ['latest', 'tag', 'user'],
  user: ['tag', 'project'],
};
