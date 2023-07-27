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

// collaboratingProjects
// (array)
// createdAt July 24, 2023 at 12:00:00 AM UTC+2
// email "temp@example.com"
// lastLoggedOut July 24, 2023 at 12:00:00 AM UTC+2
// managingProjects
// online true
// photoUrl """"
// projectsCompleted 0
// tasksCompleted 0
// uid "123456"
// userName "test-1"
