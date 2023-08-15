// components
import ModalCloseBtn from '../ModalCloseBtn/ModalCloseBtn';
import UpdatableTextValue from '../Updatables/UpdatableTextValue/UpdatableTextValue';
import UpdatableDateValue from '../Updatables/UpdatableDateValue/UpdatableDateValue';
import UpdatableSelectValue from '../Updatables/UpdatableSelectValue/UpdatableSelectValue';
import TaskNotes from '../TaskNotes/TaskNotes';
import TaskAssignment from '../TaskAssignment/TaskAssignment';
import TaskStages from '../TaskStages/TaskStages';
// style & icons
import './Task.css';
import { AiFillDelete } from 'react-icons/ai';
// hooks
import { useKanbanStore } from '../../store';
import { useProject } from '../../context/ProjectContext';
import { TaskWithId } from '../../types/taskType';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
// constant
import { TEXT_LENGTHS } from '../../constants/textLengths';
import { PRIORITIES } from '../../constants/priorities';
import { TASK_STAGES } from '../../constants/taskStages';
import { useFirestore } from '../../hooks/useFirestore';
import { useUserData } from '../../context/UserDataContext';

const Task = () => {
  const currentTaskId = useKanbanStore((state) => state.currentTaskId);
  const setCurrentTaskId = useKanbanStore((state) => state.setCurrentTaskId);
  const closeModal = useKanbanStore((state) => state.setOpenViewTaskModal);

  const { document: user } = useUserData();

  const { document: currentTask } = useOnSnapshotDocument<TaskWithId>(
    'tasks',
    currentTaskId
  );

  const { deleteDocument, updateDocument } = useFirestore();

  const { project } = useProject();

  const handleDeleteTask = async () => {
    if (!currentTask) return;
    if (!project) return;
    if (currentTask.adminUid !== user?.uid) {
      // TODO better popup
      alert('Only admin can delete task');
      return;
    }

    try {
      // remove task from project tasks
      const filteredTasks = project?.tasks.filter(
        (task) => task !== currentTask.id
      );
      setCurrentTaskId(null);
      await updateDocument('projects', project.id, { tasks: filteredTasks });
      await deleteDocument('tasks', currentTask.id);
      closeModal(false);
      // TODO error handling with router loader
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProperty = async <T,>(key: string, value: T) => {
    if (!currentTask) return;

    await updateDocument('tasks', currentTask.id, { [key]: value });
  };

  if (!currentTask) return;

  return (
    <div className="overlay">
      <div className="Task">
        <ModalCloseBtn
          handleClose={() => {
            setCurrentTaskId(null);
            closeModal(false);
          }}
        />

        <button className="Task__btn--delete" onClick={handleDeleteTask}>
          <AiFillDelete />
        </button>

        <header className="Task__header">
          <div className="Task__header__info">
            <UpdatableTextValue
              displayValue={currentTask.title}
              role="heading"
              maxLength={TEXT_LENGTHS.task.title}
              handleUpdate={(value) => handleUpdateProperty('title', value)}
            />
            <UpdatableSelectValue
              displayValue={currentTask.priority}
              options={PRIORITIES}
              handleUpdate={(value) => handleUpdateProperty('priority', value)}
            />

            <TaskStages task={currentTask} />
            {/* <UpdatableSelectValue
              displayValue={currentTask.stage}
              options={TASK_STAGES}
              handleUpdate={(value) => handleUpdateProperty('stage', value)}
            /> */}
            {currentTask.deadline !== null && (
              <UpdatableDateValue
                timestamp={currentTask.deadline}
                displayDeadline={true}
                handleUpdate={(value) =>
                  handleUpdateProperty('deadline', value)
                }
              />
            )}
          </div>
          <div className="Task__header__avatar">
            <TaskAssignment task={currentTask} />
          </div>
        </header>
        <div className="Task__body">
          <div className="Task__body__description">
            <h3>Description</h3>
            <UpdatableTextValue
              displayValue={currentTask.description}
              role="paragraph"
              maxLength={TEXT_LENGTHS.task.description}
              handleUpdate={(value) =>
                handleUpdateProperty('description', value)
              }
            />
          </div>

          <div className="Task__body__notes">
            <div className="Task__body__notes__header">
              <TaskNotes notes={currentTask.notes} taskDocId={currentTask.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
