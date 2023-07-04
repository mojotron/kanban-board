import './Login.css';
import {
  BsGithub,
  BsCheckCircle,
  BsArrowRepeat,
  BsDashCircle,
} from 'react-icons/bs';
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
  const { isPending, error, login } = useLogin();

  return (
    <div className="Login">
      <header className="Login__Header">
        <p>
          Help visualize{' '}
          <strong className="Login__Header__Highlight">work</strong> with
        </p>
        <p>
          simple <strong className="Login__Header__Highlight">project</strong>{' '}
          management tool.
        </p>
        <h1 className="Login__Header__Highlight">Kanban Board</h1>
        <p>
          Split project to small{' '}
          <strong className="Login__Header__Highlight">tasks</strong>.
        </p>
        <p>
          Build and organize{' '}
          <strong className="Login__Header__Highlight">team</strong> using
          github accounts.
        </p>
      </header>
      <main className="Login__Main">
        <div className={`Login__Main__Avatar ${isPending ? 'spinner' : ''}`}>
          <BsGithub size={100} color={'VAR(--COLOR-MAIN-50)'} />
        </div>

        <button className="btn" onClick={login}>
          Sign in with Github
        </button>

        {error && <p>{error}</p>}
      </main>
    </div>
  );
};

export default Login;
