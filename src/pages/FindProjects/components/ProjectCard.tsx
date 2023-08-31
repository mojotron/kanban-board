import { ProjectWithId } from '../../../types/projectType';
import './ProjectCard.css';

type PropsType = {
  data: ProjectWithId;
};

const ProjectCard = ({ data }: PropsType) => {
  return (
    <article className="ProjectCard">
      <h2>{data.name}</h2>
      <div>
        {data.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
        <p>{data.tasks.length}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
