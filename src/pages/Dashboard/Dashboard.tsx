// hooks
import { useKanbanStore } from '../../store';
import { useProject } from '../../context/ProjectContext';
import { useFirestore } from '../../hooks/useFirestore';
// components
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Task from '../../components/Task/Task';
import ConfirmPopup from '../../components/ConfirmPopup/ConfirmPopup';
import TeamMembers from './components/TeamMembers/TeamMembers';
import ProjectMessages from './components/PojectMessages/ProjectMessages';
import ProjectMenu from './components/ProjectMenu/ProjectMenu';
import Description from './components/Description/Description';
import Tasks from './components/Tasks/Tasks';
// types
import { TaskType } from '../../types/taskType';
// styles
import styles from './Dashboard.module.css';
import { TeamProvider } from '../../context/TeamContext';

const Dashboard = () => {
  const { updateDocument } = useFirestore();

  const openNewTaskModal = useKanbanStore((state) => state.openNewTaskModal);
  const setOpenNewTaskModal = useKanbanStore(
    (state) => state.setOpenNewTaskModal
  );

  const openViewTaskModal = useKanbanStore((state) => state.openViewTaskModal);
  const openConfirmModal = useKanbanStore((state) => state.openConfirmModal);

  const { project, projectErr, projectPending } = useProject();

  const handlePublicToggle = async () => {
    if (!project) return;
    await updateDocument('projects', project.id, { public: !project.public });
  };

  return (
    <main className={styles.dashboard}>
      {projectPending && <h2>Loading...</h2>}
      {projectErr && <h2 className="error">{projectErr}</h2>}

      {project && openNewTaskModal && <NewTaskForm tasks={project.tasks} />}

      {openConfirmModal && <ConfirmPopup />}
      {openViewTaskModal && <Task />}

      {project && (
        <>
          <ProjectMenu />
          <Tasks />
          <TeamProvider>
            <TeamMembers />
            <ProjectMessages />
          </TeamProvider>

          <Description />
        </>
      )}
    </main>
  );
};

export default Dashboard;
