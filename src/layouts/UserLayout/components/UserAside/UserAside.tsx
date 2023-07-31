import Avatar from '../../../../components/Avatar/Avatar';
import { useUserData } from '../../../../context/UserDataContext';
import './UserAside.css';
import { useCollectDocs } from '../../../../hooks/useCollectDocs';
import { ProjectType } from '../../../../types/projectType';
import ProjectList from '../ProjectList/ProjectList';

type Project = ProjectType & { id: string };

const UserAside = () => {
  const { document } = useUserData();
  const { documents: managingProjects } = useCollectDocs<Project>(
    document?.managingProjects,
    'projects'
  );
  console.log(document);

  return (
    <aside className="UserAside">
      <div className="UserAside__user">
        <Avatar
          userName={document?.userName as string}
          imageUrl={document?.photoUrl as string}
          size="75"
        />
        <div className="UserAside__user__info">
          <h2 className="heading--secondary">{document?.userName}</h2>
          <p>Projects completed: {document?.projectsCompleted}</p>
          <p>Tasks completed: {document?.tasksCompleted}</p>
        </div>
      </div>

      <div className="UserAside__projects">
        <h3 className="heading--tertiary">Managing Projects</h3>
        <ProjectList projectList={managingProjects} />
      </div>

      <div className="UserAside__projects">
        <h3 className="heading--tertiary">Collaborating Projects</h3>
      </div>
    </aside>
  );
};

export default UserAside;
