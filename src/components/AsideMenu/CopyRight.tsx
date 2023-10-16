import styles from './CopyRight.module.css';

const CopyRight = () => {
  return (
    <div className={styles.copy}>
      Created by{' '}
      <a
        className={styles.link}
        href="https://github.com/mojotron/kanban-board"
        target="_blank"
        rel="noreferrer noopener"
      >
        &#64; Mojotron
      </a>
    </div>
  );
};

export default CopyRight;
