import { useEffect, useRef, useState } from 'react';
import styles from './UpdateListItem.module.css';
import {
  AiFillDelete as IconDelete,
  AiFillEdit as IconEdit,
  AiOutlineSend as IconSubmit,
  AiOutlineClose as IconClose,
} from 'react-icons/ai';

type PropsType = {
  value: string;
  onUpdate: (oldValue: string, newValue: string) => void;
  onDelete: (value: string) => void;
};

const UpdateListItem = ({ value, onUpdate, onDelete }: PropsType) => {
  const [newValue, setNewValue] = useState(value);
  const [openEdit, setOpenEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef) return;
    inputRef.current?.focus();
  }, [openEdit]);

  return (
    <li className={styles.item}>
      {!openEdit && <span className={styles.value}>{value}</span>}
      {openEdit && (
        <div>
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => setNewValue(e.target.value)}
            value={newValue}
          />
        </div>
      )}

      <div className={styles.controls}>
        {openEdit && (
          <>
            <button
              className={styles.btn}
              onClick={() => {
                onUpdate(value, newValue);
                setOpenEdit(false);
              }}
            >
              <IconSubmit size={15} />
            </button>
            <button className={styles.btn} onClick={() => setOpenEdit(false)}>
              <IconClose size={15} />
            </button>
          </>
        )}
        {!openEdit && (
          <>
            <button className={styles.btn} onClick={() => setOpenEdit(true)}>
              <IconEdit size={15} />
            </button>
            <button className={styles.btn} onClick={() => onDelete(value)}>
              <IconDelete size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default UpdateListItem;
