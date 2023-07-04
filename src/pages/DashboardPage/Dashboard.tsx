import './Dashboard.css';
import { useLogout } from '../../hooks/useLogout';
// components
import Avatar from '../../components/Avatar/Avatar';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { authIsReady, user } = useAuth();
  console.log('AIR', authIsReady);
  console.log('user', user?.uid);
  const { logout } = useLogout();

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
