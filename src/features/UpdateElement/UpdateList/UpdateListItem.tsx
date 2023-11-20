import { useEffect, useRef, useState } from 'react';
import styles from '../styles/UpdateElement.module.css';
import UpdateControls from '../components/UpdateControls';
import UpdateInput from '../UpdateText/UpdateInput';
// constants
import { TEXT_LENGTHS } from '../../../constants/textLengths';

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
        <div className={styles.inputContainer}>
          <UpdateInput
            type="input"
            onChange={setNewValue}
            value={newValue}
            maxLength={TEXT_LENGTHS.task.note}
          />
        </div>
      )}

      <div className={styles.controls}>
        {openEdit && (
          <UpdateControls
            config={[
              {
                type: 'submit',
                onClick: () => {
                  onUpdate(value, newValue);
                  setOpenEdit(false);
                },
              },
              { type: 'close', onClick: () => setOpenEdit(false) },
            ]}
          />
        )}
        {!openEdit && (
          <UpdateControls
            config={[
              { type: 'edit', onClick: () => setOpenEdit(true) },
              { type: 'delete', onClick: () => onDelete(value) },
            ]}
          />
        )}
      </div>
    </li>
  );
};

export default UpdateListItem;
