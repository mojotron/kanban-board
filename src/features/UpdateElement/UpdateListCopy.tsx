import { useState } from 'react';
import UpdateListItem from './UpdateListItem';
import UpdateControls from './UpdateControls';
import styles from './UpdateListCopy.module.css';

type PropsType = {
  list: string[];
  onClose: () => void;
};

const UpdateListCopy = ({ list, onClose }: PropsType) => {
  const [items, setItems] = useState(() => [...list]);
  const [newItem, setNewItem] = useState('');

  // TODO helper to check if item is the same
  const handleAddItem = () => {
    if (newItem === '') return;
    setItems((oldItems) => [...oldItems, newItem]);
  };

  const handleDeleteItem = (value: string) => {
    setItems((oldItems) => oldItems.filter((item) => item !== value));
  };

  const handleUpdateItem = (oldValue: string, newValue: string) => {
    setItems((oldItems) =>
      oldItems.map((item) => (item === oldValue ? newValue : item))
    );
  };
  return (
    <div>
      {/* make own component and move list and handlers inside */}
      <ul className={styles.list}>
        {items.map((item, index) => (
          <UpdateListItem
            key={index}
            value={item}
            onDelete={handleDeleteItem}
            onUpdate={handleUpdateItem}
          />
        ))}
      </ul>

      <div className={styles.newItemBox}>
        <label>Add new Item</label>
        <input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        <UpdateControls
          onClose={onClose}
          onSubmit={() => {
            handleAddItem();
            setNewItem('');
          }}
        />
      </div>
    </div>
  );
};

export default UpdateListCopy;
