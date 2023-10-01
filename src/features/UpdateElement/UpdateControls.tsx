import {
  AiFillRightCircle as IconSubmit,
  AiFillCloseCircle as IconClose,
} from 'react-icons/ai';
import styles from './UpdateControls.module.css';

type PropsType = {
  onClose: () => void;
  onSubmit: () => void;
};

const UpdateControls = ({ onClose, onSubmit }: PropsType) => {
  return (
    <div className={styles.controls}>
      <button onClick={onClose} className={styles.btnClose}>
        <IconClose size={18} />
      </button>
      <button onClick={onSubmit} className={styles.btnSubmit}>
        <IconSubmit size={18} />
      </button>
    </div>
  );
};

export default UpdateControls;
