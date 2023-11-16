import CopyRight from '../../components/Copyright/CopyRight';
import styles from './Login.module.css';
import LoginButton from './components/LoginButton';
import LoginHeader from './components/LoginHeader';

const Login = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <LoginButton />
      <CopyRight />
    </div>
  );
};

export default Login;
