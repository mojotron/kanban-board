import { useState } from 'react';
import UpdateButton from './UpdateButton';
import UpdateListCopy from './UpdateListCopy';

type PropsType = {
  updatable?: boolean;
  list: string[];
  onUpdate: (newList: string[]) => void;
  listStyle?: string;
  itemStyle?: string;
};

const UpdateList = ({ list, updatable = true, onUpdate }: PropsType) => {
  const [openEdit, setOpenEdit] = useState(false);

  if (openEdit) {
    return (
      <UpdateListCopy
        list={list}
        onClose={() => setOpenEdit(false)}
        onUpdate={onUpdate}
      />
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {updatable && <UpdateButton onClick={setOpenEdit} />}
    </div>
  );
};

export default UpdateList;
