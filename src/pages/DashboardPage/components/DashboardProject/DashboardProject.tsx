import { useKanbanStore } from '../../../../store';

const DashboardProject = () => {
  const currentProject = useKanbanStore((state) => state.currentProject);
  return <div>DashboardProject {currentProject}</div>;
};

export default DashboardProject;
