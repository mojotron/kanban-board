import './Dashboard.css';

// components

import DashboardAside from './components/DashboardAside/DashboardAside';
import DashboardMenu from './components/DashboardMenu/DashboardMenu';
import NewProjectForm from './components/NewProjectForm.tsx/NewProjectForm';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <DashboardAside />
      <DashboardMenu />
      <NewProjectForm />
    </div>
  );
};

export default Dashboard;
