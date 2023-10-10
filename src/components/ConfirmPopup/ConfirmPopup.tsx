import Button from '../Button/Button';
import styles from './ConfirmPopup.module.css';
import {
  AiOutlineCheckCircle as IconConfirm,
  AiOutlineCloseCircle as IconCancel,
} from 'react-icons/ai';

type PropsType = {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  alert?: boolean;
};

const ConfirmPopup = ({
  message,
  onCancel,
  onConfirm,
  alert = false,
}: PropsType) => {
  return (
    <div className="overlay" style={{ zIndex: '110' }}>
      <div className={styles.popup}>
        <h3 className={styles.message}>{message}</h3>
        <div className={styles.controls}>
          <Button
            handleClick={onCancel}
            className={`${styles.btn} ${styles.red} ${
              alert ? styles.left : ''
            }`}
          >
            <IconCancel />
          </Button>
          {!alert && (
            <Button
              handleClick={onConfirm}
              className={`${styles.btn} ${styles.green} `}
            >
              <IconConfirm />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
