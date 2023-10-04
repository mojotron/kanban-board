import { ReactNode } from 'react';

type PropsType = {
  list: string[];
  children: ReactNode;
  listStyle?: string;
  itemStyle?: string;
};

const ItemsList = ({
  list,
  children,
  listStyle = '',
  itemStyle = '',
}: PropsType) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ul className={listStyle}>
        {list.map((item, index) => (
          <li key={index} className={itemStyle}>
            {item}
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
};

export default ItemsList;
