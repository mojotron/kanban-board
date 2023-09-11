// types
import { ProjectType } from '../../types/projectType';
// styles
import styles from './ProjectCard.module.css';
// components
import Avatar from '../Avatar/Avatar';
import ExpandedText from '../ExpandedText/ExpandedText';
import { useParams } from 'react-router-dom';
import { useIsCurrentUser } from '../../hooks/useIsCurrentUser';

type PropsType = {
  data: ProjectType;
};

const ProjectCard = ({ data }: PropsType) => {
  const { userId } = useParams();
  const { userData: creator } = useIsCurrentUser(userId);

  return (
    <article className={styles.projectCard}>
      <h2>{data.name}</h2>
      {creator && (
        <Avatar
          imageUrl={creator?.photoUrl}
          size="25"
          userName={creator?.userName}
        />
      )}
      <h3>{creator?.userName}</h3>
      <div>
        {data.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
        <p>Tasks {data.tasks.length}</p>
        {/* <p>Project created: {formatLocalDate(new Date(data.createdAt.seconds / 1000))}</p> */}
        <ExpandedText
          text={data.description}
          hideWordsLength={10}
          className="text"
        />
      </div>
      {creator?.uid !== data.adminUid && <button>Join</button>}
    </article>
  );
};

export default ProjectCard;
