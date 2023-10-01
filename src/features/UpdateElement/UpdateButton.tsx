import { Dispatch, SetStateAction } from 'react';
import { AiFillEdit as IconEdit } from 'react-icons/ai';
import styles from './UpdatableButton.module.css';

const UpdateButton = ({
  onClick,
}: {
  onClick: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button className={styles.updateBtn} onClick={() => onClick(true)}>
      <IconEdit size={18} />
    </button>
  );
};

export default UpdateButton;
