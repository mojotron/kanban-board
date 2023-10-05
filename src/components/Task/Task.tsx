// components
import ModalCloseBtn from '../ModalCloseBtn/ModalCloseBtn';
import UpdatableDateValue from '../Updatables/UpdatableDateValue/UpdatableDateValue';
import UpdatableSelectValue from '../Updatables/UpdatableSelectValue/UpdatableSelectValue';
import TaskNotes from '../TaskNotes/TaskNotes';
import TaskAssignment from '../TaskAssignment/TaskAssignment';
import TaskStages from '../TaskStages/TaskStages';
// style & icons
import styles from './Task.module.css';
import { AiFillDelete } from 'react-icons/ai';
// hooks
import { useProject } from '../../context/ProjectContext';
import { TaskWithId } from '../../types/taskType';
// constant
import { TEXT_LENGTHS } from '../../constants/textLengths';
import { PRIORITIES } from '../../constants/priorities';
import { POPUP_DELETE_TASK } from '../../constants/confirmPopupTexts';
import UpdateText from '../../features/UpdateElement/UpdateText/UpdateText';

type PropsType = {
  taskData: TaskWithId;
  onClose: () => void;
};

const Task = ({ taskData, onClose }: PropsType) => {
  const { project } = useProject();

  return (
    <div className="overlay">
      <div className={styles.task}>
        <ModalCloseBtn handleClose={onClose} />

        <button className={styles.btnDelete} onClick={() => {}}>
          <AiFillDelete />
        </button>

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <UpdateText
              text={taskData.title}
              onUpdate={() => {}}
              maxLength={TEXT_LENGTHS.task.title}
            />

            <UpdatableSelectValue
              displayValue={taskData.priority}
              options={PRIORITIES}
              handleUpdate={() => {}}
            />

            <TaskStages task={taskData} />

            {taskData.deadline !== null && (
              <UpdatableDateValue
                timestamp={taskData.deadline}
                displayDeadline={true}
                handleUpdate={() => {}}
              />
            )}
          </div>
          <div className={styles.headerRight}>
            <TaskAssignment task={taskData} />
          </div>
        </header>

        <div className={styles.body}>
          <div className="Task__body__description">
            <h3>Description</h3>
            <UpdateText
              text={taskData.description}
              type="textarea"
              onUpdate={() => {}}
            />
          </div>

          <div className="Task__body__notes">
            <div className="Task__body__notes__header">
              <TaskNotes notes={taskData.notes} taskDocId={taskData.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
