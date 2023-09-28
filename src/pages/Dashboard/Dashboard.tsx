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
import EditProject from './components/EditProject/EditProject';
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
  const [openEditProject, setOpenEditProject] = useState(false);

  const menuOptions: MenuOptionType[] = useMemo(() => {
    return [
      {
        text: 'Kanban Board',
        className: `${styles.menuBtn} ${styles.kanbanBtn}`,
        handleClick: () => navigate(`/kanban/${projectId}`),
      },
      {
        text: 'Project Details',
        className: `${styles.menuBtn}`,
        handleClick: () => setOpenEditProject(true),
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

      {openConfirmModal && <ConfirmPopup />}
      {openViewTaskModal && <Task />}

      {project && (
        <>
          <TeamProvider>
            {openNewTask && (
              <NewTaskForm onClose={() => setOpenNewTask(false)} />
            )}
            {openEditProject && (
              <EditProject onClose={() => setOpenEditProject(false)} />
            )}

            <ProjectMenu menuOptions={menuOptions} />
            <Tasks />
            <TeamMembers />
            <ProjectMessages />
            <Description />
          </TeamProvider>
        </>
      )}
    </main>
  );
};

export default Dashboard;
