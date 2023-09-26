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
import { useMemo, useState } from 'react';
import { MenuOptionType } from '../../types/menuOption';
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const { updateDocument } = useFirestore();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const openViewTaskModal = useKanbanStore((state) => state.openViewTaskModal);
  const openConfirmModal = useKanbanStore((state) => state.openConfirmModal);

  const { project, projectErr, projectPending } = useProject();

  const handlePublicToggle = async () => {
    if (!project) return;
    await updateDocument('projects', project.id, { public: !project.public });
  };

  const [openNewTask, setOpenNewTask] = useState(false);

  const menuOptions: MenuOptionType[] = useMemo(() => {
    return [
      {
        text: 'Kanban Board',
        className: `${styles.menuBtn} ${styles.kanbanBtn}`,
        handleClick: () => navigate(`/kanban/${projectId}`),
      },
      {
        text: 'Edit Project',
        className: `${styles.menuBtn}`,
        handleClick: () => setOpenNewTask(true),
      },
      {
        text: 'Create New Task',
        className: `${styles.menuBtn}`,
        handleClick: () => setOpenNewTask(true),
      },

      {
        text: 'Find Collaborator',
        className: `${styles.menuBtn}`,
        handleClick: () => {},
      },
    ];
  }, []);

  return (
    <main className={styles.dashboard}>
      {projectPending && <h2>Loading...</h2>}
      {projectErr && <h2 className="error">{projectErr}</h2>}

      {openNewTask && <NewTaskForm onClose={() => setOpenNewTask(false)} />}

      {openConfirmModal && <ConfirmPopup />}
      {openViewTaskModal && <Task />}

      {project && (
        <>
          <ProjectMenu menuOptions={menuOptions} />
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
