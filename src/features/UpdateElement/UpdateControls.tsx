import {
  AiFillDelete as IconDelete,
  AiFillEdit as IconEdit,
  AiOutlineSend as IconSubmit,
  AiOutlineClose as IconClose,
} from 'react-icons/ai';
import styles from './UpdateControls.module.css';

// submit, edit, delete, cancel

type ButtonType = 'submit' | 'edit' | 'delete' | 'close';
type ControlButtonType = {
  type: ButtonType;
  onClick: () => void;
};

const GenerateIcon = ({ type, size }: { type: ButtonType; size: number }) => {
  switch (type) {
    case 'submit':
      return <IconSubmit size={size} />;
    case 'close':
      return <IconClose size={size} />;
    case 'edit':
      return <IconEdit size={size} />;
    case 'delete':
      return <IconDelete size={size} />;
  }
};

type PropsType = {
  config: ControlButtonType[];
  btnSize?: number;
  className?: undefined | string;
};

const UpdateControls = ({
  config,
  btnSize = 15,
  className = undefined,
}: PropsType) => {
  return (
    <div className={styles.controls}>
      {config.map((btn, i) => (
        <button
          className={`${styles.btn}${className ? ` ${className}` : ''}`}
          key={i}
          onClick={btn.onClick}
        >
          <GenerateIcon type={btn.type} size={btnSize} />
        </button>
      ))}
    </div>
  );
};

export default UpdateControls;
