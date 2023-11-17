import HighlightText from '../../../components/HighlightText/HighlightText';
import styles from './LoginHeader.module.css';

const LoginHeader = () => {
  return (
    <header className={styles.header}>
      <HighlightText size="large" heading={true}>
        Kanban Board
      </HighlightText>

      <p className={styles.headerText}>
        Visualize your <HighlightText>work</HighlightText> with a simple{' '}
        <HighlightText>project</HighlightText> management tool. Split your
        projects to small and easy <HighlightText>tasks</HighlightText>. Build
        and organize your <HighlightText>team</HighlightText> using Github
        accounts.
      </p>
    </header>
  );
};

export default LoginHeader;
