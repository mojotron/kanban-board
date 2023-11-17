import { useLogin } from '../../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { BsGithub as IconGithub } from 'react-icons/bs';

const LoginButton = () => {
  const { isPending, error, login } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    navigate(`/`);
  };

  return (
    <Button handleClick={handleLogin} className="btn">
      {isPending && <p>Signing in...</p>}
      {error && <p>{error}</p>}
      {!isPending && !error && (
        <>
          <IconGithub size={25} color={'VAR(--COLOR-MAIN-50)'} />
          <span>Sign in with Github</span>
        </>
      )}
    </Button>
  );
};

export default LoginButton;
