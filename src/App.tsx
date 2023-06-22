import { useLogin } from './hooks/useLogin';
import { useLogout } from './hooks/useLogout';
import Login from './pages/Login/Login';

const buttonStyle = {
  border: '1px solid white',
  background: 'none',
  padding: '10px 20px',
  color: 'white',
  cursor: 'pointer',
};

const App = () => {
  const { login, error, isPending } = useLogin();
  const { logout } = useLogout();

  return (
    <div className="App">
      <Login />

      <button style={buttonStyle} className="btn" onClick={login}>{`${
        isPending ? 'Loading...' : 'Log in with Github'
      }`}</button>
      <button style={buttonStyle} className="btn" onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

export default App;
