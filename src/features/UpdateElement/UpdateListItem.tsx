import { useEffect, useRef, useState } from 'react';
import styles from './UpdateListItem.module.css';
import UpdateControls from './UpdateControls';

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
