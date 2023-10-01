import { useState } from 'react';
import styles from './UpdateList.module.css';
import UpdateButton from './UpdateButton';
import UpdateControls from './UpdateControls';
import UpdateText from './UpdateText';

type PropsType = {
  updatable?: boolean;
  list: string[];
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  listStyle?: string;
  itemStyle?: string;
};

const UpdateList = ({ list, updatable = true }: PropsType) => {
  const [items, setItems] = useState(() => [...list]);
  const [openEdit, setOpenEdit] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem === '') return;
    setItems((oldItems) => [...oldItems, newItem]);
  };

  if (openEdit) {
    return (
      <div>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <UpdateText key={index} text={item} onUpdate={() => {}} />
          ))}
        </ul>

        <div>
          <label>Add new Item</label>
          <input />
          <UpdateControls
            onClose={() => setOpenEdit(false)}
            onSubmit={() => handleAddItem()}
          />
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {updatable && <UpdateButton onClick={setOpenEdit} />}
    </div>
  );
};

export default UpdateList;
