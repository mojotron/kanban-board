export const FILTERS: ['latest', 'project', 'tag', 'username'] = [
  'latest',
  'project',
  'tag',
  'username',
];

// const stages = [...TASK_STAGES] as const;
// export type Stage = (typeof stages)[number];

const filters = [...FILTERS] as const;

export type FilterTypes = (typeof filters)[number];
