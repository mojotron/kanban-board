import { useState } from 'react';
import UpdateListItem from './UpdateListItem';
import UpdateControls from '../components/UpdateControls';
import styles from './UpdateListCopy.module.css';

type PropsType = {
  list: string[];
  onClose: () => void;
  onUpdate: (newList: string[]) => void;
};

const UpdateListCopy = ({ list, onClose, onUpdate }: PropsType) => {
  const [items, setItems] = useState(() => [...list]);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem === '') return;
    if (items.includes(newItem)) return;
    setItems((oldItems) => [...oldItems, newItem]);
  };

  const handleDeleteItem = (value: string) => {
    setItems((oldItems) => oldItems.filter((item) => item !== value));
  };

  const handleUpdateItem = (oldValue: string, newValue: string) => {
    if (items.includes(newValue)) return;
    setItems((oldItems) =>
      oldItems.map((item) => (item === oldValue ? newValue : item))
    );
  };
  return (
    <div>
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
        <div className={styles.newItemInput}>
          <label>Add new Item</label>
          <input value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        </div>
        <UpdateControls
          config={[
            { type: 'close', onClick: () => setNewItem('') },
            {
              type: 'submit',
              onClick: () => {
                handleAddItem();
                setNewItem('');
              },
            },
          ]}
        />
      </div>

      <div>
        <p>Update Tags</p>
        <UpdateControls
          config={[
            { type: 'close', onClick: onClose },
            {
              type: 'submit',
              onClick: () => {
                console.log(items);

                onUpdate(items);
                onClose();
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UpdateListCopy;
