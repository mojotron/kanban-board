import { useState } from 'react';
import styles from './UpdateText.module.css';
import {
  AiFillEdit as IconEdit,
  AiFillRightCircle as IconSubmit,
  AiFillCloseCircle as IconClose,
} from 'react-icons/ai';
import UpdateControls from './UpdateControls';
import UpdateInput from './UpdateInput';

type PropsType = {
  text: string;
  updatable?: boolean;
  className?: string;
  type?: 'input' | 'textarea';
};

const UpdateText = ({
  text,
  updatable = true,
  className = '',
  type = 'input',
}: PropsType) => {
  const [textValue, setTextValue] = useState(text);
  const [update, setUpdate] = useState(false);

  if (update)
    return (
      <div>
        <UpdateInput value={textValue} onChange={setTextValue} type={type} />

        <UpdateControls onClose={() => setUpdate(false)} onSubmit={() => {}} />
      </div>
    );

  return (
    <div className={styles.update}>
      {type === 'input' ? (
        <h3 className={`${className}`}>{text}</h3>
      ) : (
        <p className={`${className}`}>{text}</p>
      )}
      <button className={styles.updateBtn} onClick={() => setUpdate(true)}>
        <IconEdit size={18} />
      </button>
    </div>
  );
};

export default UpdateText;
