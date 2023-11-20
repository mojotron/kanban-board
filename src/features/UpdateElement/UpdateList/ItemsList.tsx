import { ReactNode } from 'react';
import styles from '../styles/UpdateElement.module.css';

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
    <div className={styles.mainContainer}>
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
