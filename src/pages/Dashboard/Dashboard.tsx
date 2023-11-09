// hooks
import { useProject } from '../../context/ProjectContext';
// components
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TeamMembers from './components/TeamMembers/TeamMembers';
import ProjectMessages from './components/ProjectMessages/ProjectMessages';
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
import Requests from '../../features/Requests/ui/Requests';

const Dashboard = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { project, projectErr, projectPending } = useProject();

  const [openNewTask, setOpenNewTask] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);

  const menuOptions: MenuOptionType[] = useMemo(() => {
    return [
      {
        text: 'Kanban Board',
        handleClick: () => navigate(`/kanban/${projectId}`),
        disabled: false,
      },
      {
        text: 'Project Details',
        handleClick: () => setOpenEditProject(true),
        disabled: false,
      },
      {
        text: `Create New Task`,
        handleClick: () => {
          if (project?.finished) return;
          setOpenNewTask(true);
        },
        disabled: project?.finished ?? false,
      },

      {
        text: 'Find Collaborator',
        handleClick: () => {},
        disabled: false,
      },
    ];
  }, [project?.finished]);

  if (project === undefined) return;

  return (
    <main className={styles.dashboard}>
      {projectPending && <h2>Loading...</h2>}
      {projectErr && <h2 className="error">{projectErr}</h2>}

      <TeamProvider>
        {openNewTask && <NewTaskForm onClose={() => setOpenNewTask(false)} />}
        {openEditProject && (
          <EditProject onClose={() => setOpenEditProject(false)} />
        )}
        <ProjectMenu menuOptions={menuOptions} />
        <Tasks />
        <TeamMembers />
        <ProjectMessages />
        <Description />
        <Requests option="users" className={styles.requests} />
      </TeamProvider>
    </main>
  );
};

export default Dashboard;
