import { useKanbanStore } from '../../store';
import './Dashboard.css';

// components

import DashboardAside from './components/DashboardAside/DashboardAside';
import DashboardMenu from './components/DashboardMenu/DashboardMenu';
import NewProjectForm from './components/NewProjectForm.tsx/NewProjectForm';

const Dashboard = () => {
  const projectModal = useKanbanStore((state) => state.openNewProjectModal);
  return (
    <div className="Dashboard">
      <DashboardAside />
      <DashboardMenu />
      {projectModal && <NewProjectForm />}
    </div>
  );
};

export default Dashboard;
