import {
  AiFillRightCircle as IconSubmit,
  AiFillCloseCircle as IconClose,
} from 'react-icons/ai';

type PropsType = {
  onClose: () => void;
  onSubmit: () => void;
};

const UpdateControls = ({ onClose, onSubmit }: PropsType) => {
  return (
    <div>
      <button onClick={onClose}>
        <IconClose size={18} />
      </button>
      <button onClick={onSubmit}>
        <IconSubmit size={18} />
      </button>
    </div>
  );
};

export default UpdateControls;
