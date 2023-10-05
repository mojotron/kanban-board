import styles from './ModalCloseBtn.module.css';

type PropsType = {
  handleClose: () => void;
};

const ModalCloseBtn = ({ handleClose }: PropsType) => {
  return (
    <button className={styles.btn} type="button" onClick={handleClose}>
      &times;
    </button>
  );
};

export default ModalCloseBtn;
