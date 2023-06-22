import './Login.css';
import { BsGithub } from 'react-icons/bs';
import Logo from './components/Logo';

const Login = () => {
  return (
    <div>
      <header>
        <h1>Kanban Board</h1>
        <p>short description</p>
        <Logo />
      </header>
      <main></main>
      <div>
        <BsGithub />
        Use your Github account and organize your tasks fast
        <button className="btn">Sign in</button>
      </div>
    </div>
  );
};

export default Login;
