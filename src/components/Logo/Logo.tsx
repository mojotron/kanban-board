import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <h1 className="logo-highlight">Kanban</h1>
      <h1 className="logo-highlight">Board</h1>
    </div>
  );
};

export default Logo;
