import { ProjectWithId } from '../../../types/projectType';

type PropsType = {
  data: ProjectWithId;
};

const ProjectCard = ({ data }: PropsType) => {
  return (
    <article>
      <h2>{data.name}</h2>
    </article>
  );
};

export default ProjectCard;
