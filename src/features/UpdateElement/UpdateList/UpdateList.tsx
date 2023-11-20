import { useState } from 'react';
import UpdateButton from '../components/UpdateButton';
import UpdateListCopy from './UpdateListCopy';
import ItemsList from './ItemsList';

type PropsType = {
  updatable?: boolean;
  list: string[];
  onUpdate: (newList: string[]) => void;
  listStyle?: string;
  itemStyle?: string;
};

const UpdateList = ({
  list,
  updatable = true,
  onUpdate,
  listStyle,
  itemStyle,
}: PropsType) => {
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
    <ItemsList list={list} listStyle={listStyle} itemStyle={itemStyle}>
      {list.length === 0 && <p>Add new entry</p>}
      {updatable && <UpdateButton onClick={setOpenEdit} />}
    </ItemsList>
  );
};

export default UpdateList;
