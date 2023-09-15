// hooks
import { useKanbanStore } from '../../../../store';
import { useProject } from '../../../../context/ProjectContext';
// types
import { Stage, TaskWithId } from '../../../../types/taskType';
// constants
import { TASK_STAGES } from '../../../../constants/taskStages';
// components
import Button from '../../../../components/Button/Button';
// style
import styles from './TabsMenu.module.css';
// helper
const countTasks = (tasks: TaskWithId[], stage: Stage) => {
  const filtered = tasks.filter((task) => task.stage === stage);
  if (!filtered) return filtered;
  return filtered.length;
};

const TabsMenu = () => {
  const { tasks } = useProject();
  const currentTaskStage = useKanbanStore((state) => state.currentTaskStage);
  const setCurrentTaskStage = useKanbanStore(
    (state) => state.setCurrentTaskStage
  );

  return (
    <menu className={styles.tabsMenu}>
      {/* loop over tasks labels */}
      {TASK_STAGES.map((stage) => {
        const numOfTasks = countTasks(tasks || [], stage);
        // return button for each task label
        return (
          <Button
            key={stage}
            handleClick={() => setCurrentTaskStage(stage)}
            className={`${styles.tabsMenuBtn} ${
              stage === currentTaskStage ? styles.active : ''
            }`}
          >
            {stage}
            {numOfTasks ? `(${numOfTasks})` : ''}
          </Button>
        );
      })}
    </menu>
  );
};

export default TabsMenu;
