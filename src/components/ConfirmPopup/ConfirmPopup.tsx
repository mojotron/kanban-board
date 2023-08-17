import './ConfirmPopup.css';
import { useKanbanStore } from '../../store';

const ConfirmPopup = () => {
  const data = useKanbanStore((state) => state.openConfirmModal);

  const handleCancel = useKanbanStore((state) => state.setOpenConfirmModal);

  return (
    <div className="ConfirmPopup__overlay">
      <div className="ConfirmPopup__wrapper">
        <p className="ConfirmPopup__wrapper__text">{data?.text}</p>
        <div className="ConfirmPopup__wrapper__btns">
          {data?.confirmBox && (
            <button
              className="btn"
              onClick={() => {
                data?.handleConfirm();
                handleCancel(null);
              }}
            >
              Confirm
            </button>
          )}
          <button className="btn" onClick={() => handleCancel(null)}>
            {data?.confirmBox ? 'Cancel' : 'Ok'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
