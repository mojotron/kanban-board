import './Dashboard.css';

import { useLogout } from '../../hooks/useLogout';
import { useStore } from '../../store';
// components
import Avatar from '../../components/Avatar/Avatar';

const Dashboard = () => {
  const { logout } = useLogout();
  const authIsReady = useStore((state) => state.authIsReady);
  const user = useStore((state) => state.user);

  console.log(user);

  return (
    <div className="Dashboard">
      <header className="Dashboard__Header">
        {user && (
          <Avatar
            imageUrl={user.photoUrl}
            userName={user.userName}
            size="100"
          />
        )}

        <div>
          <h3>Projects completed: 3</h3>
          <h4>Tasks completed: 15</h4>
        </div>

        <div>
          <button className="btn" onClick={logout}>
            Create Project
          </button>
          <button className="btn" onClick={logout}>
            Find Project
          </button>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <aside className="Dashboard__Aside">
        <section>
          <h3>Projects</h3>
        </section>

        <section>
          <h3>Tasks</h3>
        </section>
      </aside>
    </div>
  );
};

export default Dashboard;
