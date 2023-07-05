import './Dashboard.css';
import { useLogout } from '../../hooks/useLogout';
// components
import Avatar from '../../components/Avatar/Avatar';
import { useUserData } from '../../context/UserDataContext';

const Dashboard = () => {
  const { logout } = useLogout();
  const { document } = useUserData();

  return (
    <div className="Dashboard">
      <header className="Dashboard__Header">
        {document && (
          <Avatar
            imageUrl={document.photoUrl}
            userName={document.userName}
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
