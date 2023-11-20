import {
  AiFillDelete as IconDelete,
  AiFillEdit as IconEdit,
  AiOutlineSend as IconSubmit,
  AiOutlineClose as IconClose,
} from 'react-icons/ai';
import styles from '../styles/UpdateElement.module.css';

// submit, edit, delete, cancel

type ButtonType = 'submit' | 'edit' | 'delete' | 'close';
type ControlButtonType = {
  type: ButtonType;
  onClick: () => void;
};

const GenerateIcon = ({ type, size }: { type: ButtonType; size: number }) => {
  switch (type) {
    case 'submit':
      return <IconSubmit size={size} title="Update" />;
    case 'close':
      return <IconClose size={size} title="Cancel input" />;
    case 'edit':
      return <IconEdit size={size} title="Edit" />;
    case 'delete':
      return <IconDelete size={size} title="Delete" />;
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
          className={`btn--icon ${className ? ` ${className}` : ''}`}
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
