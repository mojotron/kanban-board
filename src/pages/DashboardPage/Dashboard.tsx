import { useKanbanStore } from '../../store';
import './Dashboard.css';

// components

import DashboardAside from './components/DashboardAside/DashboardAside';
import DashboardMenu from './components/DashboardMenu/DashboardMenu';
import DashboardProject from './components/DashboardProject/DashboardProject';
import NewProjectForm from './components/NewProjectForm.tsx/NewProjectForm';

const Dashboard = () => {
  const projectModal = useKanbanStore((state) => state.openNewProjectModal);
  return (
    <div className="Dashboard">
      <DashboardAside />
      <DashboardMenu />
      <DashboardProject />
      {projectModal && <NewProjectForm />}
    </div>
  );
};

export default Dashboard;
