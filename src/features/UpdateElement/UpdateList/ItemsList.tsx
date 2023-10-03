import { ReactNode } from 'react';

const ItemsList = ({
  list,
  children,
}: {
  list: string[];
  children: ReactNode;
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {/* {updatable && <UpdateButton onClick={setOpenEdit} />} */}
      {children}
    </div>
  );
};

export default ItemsList;
