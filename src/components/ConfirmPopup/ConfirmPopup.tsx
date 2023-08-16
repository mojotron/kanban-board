import './ConfirmPopup.css';
import { useKanbanStore } from '../../store';
import { ConfirmModalState } from '../../store';

const ConfirmPopup = () => {
  const data = useKanbanStore((state) => state.openConfirmModal);

  return (
    <div className="ConfirmPopup__overlay">
      <div className="ConfirmPopup__wrapper">
        <p>{data?.text}</p>
        <div>
          <button>Confirm</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
