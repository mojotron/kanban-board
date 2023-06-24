import { Link, useNavigate } from '@tanstack/router';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      Dashboard
      <button onClick={() => navigate({ to: '/project/test' })}>CLICK</button>
    </div>
  );
};

export default Dashboard;
