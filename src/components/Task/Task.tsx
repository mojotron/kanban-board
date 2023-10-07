// components
import ModalCloseBtn from '../ModalCloseBtn/ModalCloseBtn';
import TaskAssignment from '../TaskAssignment/TaskAssignment';
import UpdateText from '../../features/UpdateElement/UpdateText/UpdateText';
import UpdateList from '../../features/UpdateElement/UpdateList/UpdateList';
import TaskStages from '../TaskStages/TaskStages';
import Button from '../Button/Button';
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
import UpdateDate from '../../features/UpdateElement/UpdateDate/UpdateDate';
import UpdateSelect from '../../features/UpdateElement/UpdateSelect/UpdateSelect';

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
        <Button handleClick={() => {}} className={styles.btnDelete}>
          <AiFillDelete />
        </Button>

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <UpdateText
              text={taskData.title}
              onUpdate={() => {}}
              maxLength={TEXT_LENGTHS.task.title}
            />

            <UpdateSelect
              currentOption={taskData.priority}
              options={PRIORITIES}
              onUpdate={() => {}}
            />

            <TaskStages task={taskData} />

            {taskData.deadline !== null && (
              <UpdateDate timestamp={taskData.deadline} onUpdate={() => {}} />
            )}
          </div>
          <div className={styles.headerRight}>
            <TaskAssignment task={taskData} />
          </div>
        </header>

        <div className={styles.body}>
          <h3>Description</h3>
          <UpdateText
            text={taskData.description}
            type="textarea"
            onUpdate={() => {}}
          />

          <h3>Notes</h3>
          <UpdateList
            list={taskData.notes}
            onUpdate={() => {}}
            listStyle={styles.notes}
            itemStyle={styles.note}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
