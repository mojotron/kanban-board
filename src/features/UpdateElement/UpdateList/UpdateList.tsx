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
    <ItemsList list={list}>
      {updatable && <UpdateButton onClick={setOpenEdit} />}
    </ItemsList>
  );
};

export default UpdateList;
