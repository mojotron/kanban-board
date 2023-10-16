import Button from '../Button/Button';
import styles from './MenuList.module.css';

export type MenuItemType = {
  text: string;
  onClick: () => void;
};

type PropsType = {
  buttons: MenuItemType[];
};

const MenuList = ({ buttons }: PropsType) => {
  return (
    <menu className={styles.list}>
      {buttons.map((ele) => (
        <Button
          key={ele.text}
          text={ele.text}
          handleClick={ele.onClick}
          className={styles.item}
        />
      ))}
    </menu>
  );
};

export default MenuList;
