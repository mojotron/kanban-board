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
import { Priority, TaskWithId } from '../../types/taskType';
// constant
import { TEXT_LENGTHS } from '../../constants/textLengths';
import { PRIORITIES } from '../../constants/priorities';
import { POPUP_DELETE_TASK } from '../../constants/confirmPopupTexts';
import UpdateDate from '../../features/UpdateElement/UpdateDate/UpdateDate';
import UpdateSelect from '../../features/UpdateElement/UpdateSelect/UpdateSelect';
import { useState } from 'react';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import { useUserData } from '../../context/UserDataContext';
import { useCloseOnEscape } from '../../hooks/useCloseOnEscape';

type PropsType = {
  taskData: TaskWithId;
  onClose: () => void;
};

const Task = ({ taskData, onClose }: PropsType) => {
  const { document: user } = useUserData();
  const { updateTaskField, deleteTask } = useProject();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  useCloseOnEscape(onClose);

  const isAdmin = user?.uid === taskData.adminUid;

  return (
    <div className="overlay">
      {showDeleteConfirm && (
        <ConfirmPopup
          message={POPUP_DELETE_TASK}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            deleteTask(taskData.id);
            setShowDeleteConfirm(false);
          }}
        />
      )}

      <div className={styles.task}>
        <ModalCloseBtn handleClose={onClose} />
        {isAdmin && (
          <Button
            handleClick={() => setShowDeleteConfirm(true)}
            className={styles.btnDelete}
          >
            <AiFillDelete />
          </Button>
        )}

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h3 className={styles.fieldHeading}>Title</h3>
            <UpdateText
              text={taskData.title}
              onUpdate={(value) => updateTaskField('title', value, taskData.id)}
              maxLength={TEXT_LENGTHS.task.title}
              updatable={isAdmin}
            />

            <h3 className={styles.fieldHeading}>Priority</h3>
            <UpdateSelect
              currentOption={taskData.priority}
              options={PRIORITIES}
              onUpdate={(value) =>
                updateTaskField('priority', value as Priority, taskData.id)
              }
              updatable={isAdmin}
            />

            <h3 className={styles.fieldHeading}>Stage</h3>
            <TaskStages task={taskData} />

            <h3 className={styles.fieldHeading}>Deadline</h3>
            <UpdateDate
              timestamp={taskData.deadline}
              onUpdate={(value) =>
                updateTaskField('deadline', value, taskData.id)
              }
              updatable={isAdmin}
            />
          </div>

          <div className={styles.headerRight}>
            <h3 className={styles.fieldHeading}>Assignment</h3>
            <TaskAssignment task={taskData} />
          </div>
        </header>

        <div className={styles.body}>
          <h3 className={styles.fieldHeading}>Description</h3>
          <UpdateText
            text={taskData.description}
            type="textarea"
            onUpdate={(value) =>
              updateTaskField('description', value, taskData.id)
            }
            updatable={isAdmin}
          />

          <h3 className={styles.fieldHeading}>Notes</h3>
          <UpdateList
            list={taskData.notes}
            onUpdate={(value) => updateTaskField('notes', value, taskData.id)}
            listStyle={styles.notes}
            itemStyle={styles.note}
            updatable={isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
