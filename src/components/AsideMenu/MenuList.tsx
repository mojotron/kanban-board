import Button from '../Button/Button';

type PropsType = {
  buttons: { text: string }[];
};

const MenuList = ({ buttons }: PropsType) => {
  return (
    <menu className="flex-col">
      {buttons.map((ele) => (
        <Button key={ele.text} text={ele.text} handleClick={() => {}} />
      ))}
    </menu>
  );
};

export default MenuList;
