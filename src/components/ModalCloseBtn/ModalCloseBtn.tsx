import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
  handleClose: () => void;
};

const ModalCloseBtn = ({ handleClose }: Props) => {
  return (
    <button className="btn--icon" type="button" onClick={handleClose}>
      <AiOutlineCloseCircle size={30} color="var(--COLOR-BLUE-500)" />
    </button>
  );
};

export default ModalCloseBtn;
