import Button from '../Button/Button';

export type MenuItemType = {
  text: string;
  onClick: () => void;
};

type PropsType = {
  buttons: MenuItemType[];
};

const MenuList = ({ buttons }: PropsType) => {
  return (
    <menu className="flex-col">
      {buttons.map((ele) => (
        <Button key={ele.text} text={ele.text} handleClick={ele.onClick} />
      ))}
    </menu>
  );
};

export default MenuList;
