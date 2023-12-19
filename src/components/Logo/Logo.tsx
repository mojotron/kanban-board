import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <h1 className="logo-highlight">Kanban Board</h1>
    </div>
  );
};

export default Logo;
